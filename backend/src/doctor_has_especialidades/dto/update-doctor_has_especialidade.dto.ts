import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorHasEspecialidadeDto } from './create-doctor_has_especialidade.dto';

export class UpdateDoctorHasEspecialidadeDto extends PartialType(CreateDoctorHasEspecialidadeDto) {}
