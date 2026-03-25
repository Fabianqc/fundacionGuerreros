import { IsString, IsNotEmpty, IsUUID, IsEnum, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DoctorStatus } from "../entities/doctor.entity";
import { CreateDoctorHorarioDto } from "../../doctor-horario/dto/create-doctor-horario.dto";

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

    @IsObject()
    @ValidateNested()
    @Type(() => CreateDoctorHorarioDto)
    horarios: CreateDoctorHorarioDto;
}
