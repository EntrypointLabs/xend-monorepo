import { IsNotEmpty, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  serializedTransaction: string;

  @IsString()
  @IsNotEmpty()
  walletId: string;
}
