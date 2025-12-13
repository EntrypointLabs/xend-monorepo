import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount
} from "@solana/spl-token"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from "@solana/web3.js"

export const createSPLTransferTransaction = async (
  fromAddress: string,
  toAddress: string,
  tokenMintAddress: string,
  amount: number,
  decimals: number = 6 // Default for USDC, adjust for your token
) => {
  console.log(
    "PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL :>> ",
    process.env.PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL
  )
  // Set up connection to Solana network
  const connection = new Connection(
    process.env.PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL!,
    "confirmed"
  )

  // Create public key objects
  const fromPubkey = new PublicKey(fromAddress)
  const toPubkey = new PublicKey(toAddress)
  const mintPubkey = new PublicKey(tokenMintAddress)

  // Get associated token accounts
  const fromTokenAccount = await getAssociatedTokenAddress(
    mintPubkey,
    fromPubkey
  )

  const toTokenAccount = await getAssociatedTokenAddress(mintPubkey, toPubkey)

  // Convert amount to token units (considering decimals)
  const tokenAmount = amount * Math.pow(10, decimals)

  // Create transfer instruction
  const transferInstruction = createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    fromPubkey,
    tokenAmount
  )

  // Create transaction and add instruction
  const transaction = new Transaction().add(transferInstruction)

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = fromPubkey

  return { transaction, connection }
}

interface TSendSplToken {
  fromAddress: string
  mint: string
  amount: number
  toAddress: string
  solFee?: number
  decimals?: number
}

export async function sendSplToken({
  // wallet,
  mint,
  amount,
  fromAddress,
  toAddress,
  solFee = 0,
  decimals = 6
}: TSendSplToken) {
  const connection = new Connection(
    process.env.PLASMO_PUBLIC_SOLANA_MAINNET_RPC_URL!,
    "confirmed"
  )
  // const signer = await wallet.getSigner()

  const Ixs: TransactionInstruction[] = []

  if (new PublicKey(mint).equals(SystemProgram.programId)) {
    Ixs.push(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(fromAddress),
        toPubkey: new PublicKey(toAddress),
        lamports: BigInt(Math.round(amount * LAMPORTS_PER_SOL))
      })
    )
  } else {
    const sourceAccount = getAssociatedTokenAddressSync(
      new PublicKey(mint),
      new PublicKey(fromAddress)
    )

    const destinationTokenAccountInfo = await connection.getAccountInfo(
      new PublicKey(toAddress),
      "finalized"
    )

    let destinationTokenAccount: PublicKey | null

    // try {
    //   const tokenAccount = await getOrCreateAssociatedTokenAccount(
    //     connection,
    //     signer,
    //     new PublicKey(mint),
    //     new PublicKey(toAddress)
    //   )

    //   destinationTokenAccount = tokenAccount.address
    // } catch (error) {
    //   destinationTokenAccount = null
    // }

    if (!destinationTokenAccountInfo || !destinationTokenAccount) {
      destinationTokenAccount = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        new PublicKey(toAddress)
      )

      Ixs.push(
        createAssociatedTokenAccountInstruction(
          new PublicKey(fromAddress),
          destinationTokenAccount,
          new PublicKey(toAddress),
          new PublicKey(mint)
        )
      )
    }

    Ixs.push(
      createTransferInstruction(
        sourceAccount,
        destinationTokenAccount,
        new PublicKey(fromAddress),
        Math.round(amount * Math.pow(10, decimals))
      )
    )
  }

  if (solFee > 0) {
    Ixs.push(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(fromAddress),
        toPubkey: new PublicKey(toAddress),
        lamports: BigInt(solFee * LAMPORTS_PER_SOL)
      })
    )
  }

  const latestBlockHash = await connection.getLatestBlockhash()

  const messageV0 = new TransactionMessage({
    payerKey: new PublicKey(fromAddress),
    recentBlockhash: latestBlockHash.blockhash,
    instructions: [...Ixs]
  }).compileToV0Message()

  const transaction = new VersionedTransaction(messageV0)

  // const signedTx = await signer.signTransaction(transaction)

  // const signature = await connection.sendRawTransaction(signedTx.serialize(), {
  //   skipPreflight: false
  // })

  // console.log("signature", signature)

  return { transaction, connection }
}
