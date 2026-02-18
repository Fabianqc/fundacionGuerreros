import { IsString, IsNotEmpty, IsUUID, IsEnum, IsArray } from "class-validator";
import { DoctorStatus } from "../entities/doctor.entity";

export class CreateDoctorDto {

    @IsString()
    tipo_cedula: string;

    @IsString()
    ci_doctor: string;

    @IsString()
    licenseNumber: string;

    @IsEnum(DoctorStatus, { message: 'El estado debe ser Activo o Inactivo' })
    status: DoctorStatus;

    @IsArray()
    especialidades: string[];

    @IsArray()
    horarios: string[];
}
