import { Module } from '@nestjs/common';
import { DoctorHorarioService } from './doctor-horario.service';
import { DoctorHorarioController } from './doctor-horario.controller';

@Module({
  controllers: [DoctorHorarioController],
  providers: [DoctorHorarioService],
})
export class DoctorHorarioModule {}
