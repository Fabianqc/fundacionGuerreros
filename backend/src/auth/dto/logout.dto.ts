import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LogoutDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    email: string;
}
