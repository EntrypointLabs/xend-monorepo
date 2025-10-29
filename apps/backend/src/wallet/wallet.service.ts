import { Injectable } from '@nestjs/common';
import {
  CreatePrivyEmbeddedWalletByAccountIdDto,
  CreateWalletDto,
} from './dto/create-wallet.dto';
import { PrivyClient } from '@privy-io/node';
import { Connection, PublicKey } from '@solana/web3.js';

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
  create(data: CreateWalletDto) {
    return data;
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
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL!; // TODO: Use environment variable
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
}
