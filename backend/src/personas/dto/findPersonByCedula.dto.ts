import { IsString, IsNotEmpty } from "class-validator";

export class FindPersonByCedulaDto {
    @IsString()
    @IsNotEmpty()
    cedula: string;

    @IsString()
    @IsNotEmpty()
    tipo_cedula: string;
}