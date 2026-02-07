import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorHorarioService } from './doctor-horario.service';
import { CreateDoctorHorarioDto } from './dto/create-doctor-horario.dto';
import { UpdateDoctorHorarioDto } from './dto/update-doctor-horario.dto';

@Controller('doctor-horario')
export class DoctorHorarioController {
  constructor(private readonly doctorHorarioService: DoctorHorarioService) {}

  @Post()
  create(@Body() createDoctorHorarioDto: CreateDoctorHorarioDto) {
    return this.doctorHorarioService.create(createDoctorHorarioDto);
  }

  @Get()
  findAll() {
    return this.doctorHorarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorHorarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorHorarioDto: UpdateDoctorHorarioDto) {
    return this.doctorHorarioService.update(+id, updateDoctorHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorHorarioService.remove(+id);
  }
}
