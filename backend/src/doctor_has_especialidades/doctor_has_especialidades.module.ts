import { Module } from '@nestjs/common';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';
import { DoctorHasEspecialidadesController } from './doctor_has_especialidades.controller';

@Module({
  controllers: [DoctorHasEspecialidadesController],
  providers: [DoctorHasEspecialidadesService],
})
export class DoctorHasEspecialidadesModule {}
