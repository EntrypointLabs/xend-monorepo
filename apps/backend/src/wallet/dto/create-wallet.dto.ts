import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;


  @IsString()
  @IsNotEmpty()
  platform: string;
}