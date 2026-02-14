import { Module } from '@nestjs/common';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';
import { DoctorHasEspecialidadesController } from './doctor_has_especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorHasEspecialidade } from './entities/doctor_has_especialidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorHasEspecialidade])],
  controllers: [DoctorHasEspecialidadesController],
  providers: [DoctorHasEspecialidadesService],
})
export class DoctorHasEspecialidadesModule { }
