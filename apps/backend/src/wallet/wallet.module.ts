import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Module({
  controllers: [WalletController],
  providers: [WalletService, ApiKeyGuard],
})
export class WalletModule {}