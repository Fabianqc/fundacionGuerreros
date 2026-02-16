import { IsString, IsEnum, IsNotEmpty } from "class-validator";
export class CreatePatologiaDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEnum(['Bajo', 'Medio', 'Alto'])
    riesgo: string;

    @IsString()
    descripcion: string;
}
