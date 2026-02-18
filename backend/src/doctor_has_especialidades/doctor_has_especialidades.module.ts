import { Module } from '@nestjs/common';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';
import { DoctorHasEspecialidadesController } from './doctor_has_especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { DoctorHasEspecialidade } from './entities/doctor_has_especialidade.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorHasEspecialidade, Doctor, Especialidade])],
  controllers: [DoctorHasEspecialidadesController],
  providers: [DoctorHasEspecialidadesService],
  exports: [DoctorHasEspecialidadesService],
})
export class DoctorHasEspecialidadesModule { }
