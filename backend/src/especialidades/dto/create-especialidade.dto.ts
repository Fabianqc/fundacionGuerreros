import { IsString, IsNotEmpty } from "class-validator";

export class CreateEspecialidadeDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
