import { Module } from '@nestjs/common';
import { DoctorHorarioService } from './doctor-horario.service';
import { DoctorHorarioController } from './doctor-horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorHorario } from './entities/doctor-horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorHorario])],
  controllers: [DoctorHorarioController],
  providers: [DoctorHorarioService],
})
export class DoctorHorarioModule { }
