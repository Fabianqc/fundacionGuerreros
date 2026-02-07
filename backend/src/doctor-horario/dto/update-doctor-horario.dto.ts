import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorHorarioDto } from './create-doctor-horario.dto';

export class UpdateDoctorHorarioDto extends PartialType(CreateDoctorHorarioDto) {}
