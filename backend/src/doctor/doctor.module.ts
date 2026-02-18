import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorHasEspecialidade } from 'src/doctor_has_especialidades/entities/doctor_has_especialidade.entity';
import { DoctorHorario } from 'src/doctor-horario/entities/doctor-horario.entity';
import { DataSource } from 'typeorm';
import { DoctorHasEspecialidadesService } from 'src/doctor_has_especialidades/doctor_has_especialidades.service';
import { Persona } from 'src/personas/entities/persona.entity';
import { DoctorHasEspecialidadesModule } from 'src/doctor_has_especialidades/doctor_has_especialidades.module';
@Module({
  imports: [TypeOrmModule.forFeature([Doctor, DoctorHasEspecialidade, DoctorHorario]), DoctorHasEspecialidadesModule],
  controllers: [DoctorController],
  providers: [DoctorService, Persona],
})
export class DoctorModule { }
