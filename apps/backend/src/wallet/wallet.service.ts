import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {

  create(data: CreateWalletDto) {
    return data
  }
}