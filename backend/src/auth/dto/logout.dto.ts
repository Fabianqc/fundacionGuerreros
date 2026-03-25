import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LogoutDto {
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
