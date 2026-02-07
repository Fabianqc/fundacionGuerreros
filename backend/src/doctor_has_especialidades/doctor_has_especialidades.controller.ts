import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';
import { CreateDoctorHasEspecialidadeDto } from './dto/create-doctor_has_especialidade.dto';
import { UpdateDoctorHasEspecialidadeDto } from './dto/update-doctor_has_especialidade.dto';

@Controller('doctor-has-especialidades')
export class DoctorHasEspecialidadesController {
  constructor(private readonly doctorHasEspecialidadesService: DoctorHasEspecialidadesService) {}

  @Post()
  create(@Body() createDoctorHasEspecialidadeDto: CreateDoctorHasEspecialidadeDto) {
    return this.doctorHasEspecialidadesService.create(createDoctorHasEspecialidadeDto);
  }

  @Get()
  findAll() {
    return this.doctorHasEspecialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorHasEspecialidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorHasEspecialidadeDto: UpdateDoctorHasEspecialidadeDto) {
    return this.doctorHasEspecialidadesService.update(+id, updateDoctorHasEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorHasEspecialidadesService.remove(+id);
  }
}
