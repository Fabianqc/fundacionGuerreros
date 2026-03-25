import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorHorarioService } from './doctor-horario.service';
import { CreateDoctorHorarioDto } from './dto/create-doctor-horario.dto';
import { UpdateDoctorHorarioDto } from './dto/update-doctor-horario.dto';

@Controller('doctor-horario')
export class DoctorHorarioController {
  constructor(private readonly doctorHorarioService: DoctorHorarioService) {}

}
