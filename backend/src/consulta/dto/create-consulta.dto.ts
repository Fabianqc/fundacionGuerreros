import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";
import * as crypto from "crypto";

export class CreateConsultaDto {
    @IsDateString()
    @IsNotEmpty()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    observacion: string;

    @IsUUID()
    @IsNotEmpty()
    doctor: crypto.UUID;

    @IsUUID()
    @IsNotEmpty()
    paciente: crypto.UUID;
}
