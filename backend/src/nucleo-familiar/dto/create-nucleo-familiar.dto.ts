import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Parentesco } from "../entities/nucleo-familiar.entity";

export class CreateNucleoFamiliarDto {
    @IsUUID()
    @IsNotEmpty()
    pacienteId: string;

    @IsUUID()
    @IsNotEmpty()
    personaId: string;

    @IsEnum(Parentesco)
    @IsNotEmpty()
    parentesco: Parentesco;
}
