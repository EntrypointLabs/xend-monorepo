import { Injectable } from '@nestjs/common';
import {
  CreatePrivyEmbeddedWalletByAccountIdDto,
  CreateWalletDto,
} from './dto/create-wallet.dto';
import { PrivyClient } from '@privy-io/node';
import { Connection, PublicKey } from '@solana/web3.js';
import { TransferDto } from './dto/create-transaction';
import { AuthorizationContext } from '@privy-io/node';

type ParsedTokenData = {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
};

@Injectable()
export class WalletService {
  async create(data: CreateWalletDto) {
    const privy = new PrivyClient({
      appId: process.env.PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_CLIENT_SECRET!,
    });

    const user = await privy.users().create({
      linked_accounts: [
        {
          type: data.platform,
          name: data.name,
          username: data.username,
          subject: data.subject,
        },
      ],
      wallets: [{ chain_type: 'solana' }],
    });

    return user;
  }
  async createPrivyEmbeddedWalletByAccountId(
    data: CreatePrivyEmbeddedWalletByAccountIdDto,
  ) {
    const { accountId, chainType } = data;
    const privy = new PrivyClient({
      appId: process.env.PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_CLIENT_SECRET!,
    });

    const wallet = await privy.wallets().create({
      chain_type: chainType,
      owner_id: accountId.split(':')[accountId.split(':').length - 1],
    });

    console.log('wallet :>> ', wallet);
    return data;
  }

  async getTokenAccountBalanceByOwnerAndTokenAddress(
    owner: string,
    tokenAddress: string,
  ) {
    const rpcUrl = process.env.SOLANA_MAINNET_RPC_URL!;
    const connection = new Connection(rpcUrl);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(owner),
      { mint: new PublicKey(tokenAddress) },
    );

    const tokenInfo = tokenAccounts.value.map((token) => {
      const parsedTokenData = (
        token.account.data.parsed as { info: ParsedTokenData }
      )?.info;

      return {
        mint: parsedTokenData.mint,
        uiAmount: parsedTokenData.tokenAmount.uiAmount,
        amount: parsedTokenData.tokenAmount.amount,
        decimals: parsedTokenData.tokenAmount.decimals,
      };
    });

    const res = tokenInfo.find((token) => token.mint === tokenAddress);

    return res || { amount: '0', uiAmount: 0, decimals: 0, mint: tokenAddress };
  }

  async transfer(data: TransferDto, context: { authorization: string }) {
    const { serializedTransaction, walletId } = data;
    const privy = new PrivyClient({
      appId: process.env.PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_CLIENT_SECRET!,
      jwtVerificationKey: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEo/or2JHeSXaMrCGNf2xjiKKycn0+Yeyl0rcLFuit7GSLecua7oIdPv7tFNmWNtN7kikyK07uTK2QHWH5zjDlLQ==
-----END PUBLIC KEY-----`,
    });

    const accessToken = context.authorization.replace('Bearer ', '');

    const verifiedClaims = await privy
      .utils()
      .auth()
      .verifyAuthToken(accessToken);

    // verifiedClaims.

    // const transaction = await privy.wallets()._rpc(walletId, {
    //   method: 'signAndSendTransaction',
    //   caip2: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    //   params: {
    //     transaction: serializedTransaction,
    //     encoding: 'base64',
    //   },
    // });

    const authorizationContext: AuthorizationContext = {
      user_jwts: ['insert-user-jwt'],
    };

    const transaction = await privy
      .wallets()
      .solana()
      .signAndSendTransaction(walletId, {
        transaction: serializedTransaction,
        caip2: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        authorization_context: authorizationContext,
      });

    return transaction;
  }
}
