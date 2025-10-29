import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreatePrivyEmbeddedWalletByAccountIdDto,
  CreateWalletDto,
} from './dto/create-wallet.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() data: CreateWalletDto) {
    return this.walletService.create(data);
  }

  @Post('privy/account')
  createPrivyEmbeddedWalletByAccountId(
    @Body() data: CreatePrivyEmbeddedWalletByAccountIdDto,
  ) {
    return this.walletService.createPrivyEmbeddedWalletByAccountId(data);
  }

  @Get('balance')
  getBalance(
    @Query('owner') owner: string,
    @Query('tokenAddress') tokenAddress: string,
  ) {
    return this.walletService.getTokenAccountBalanceByOwnerAndTokenAddress(
      owner,
      tokenAddress,
    );
  }
}
