import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('doctor')
@UseGuards(AuthGuard('jwt'))
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAllWithLimit(@Query('skip') skip: number, @Query('take') take: number, @Query('search') search: string) {
    return this.doctorService.findAllWithLimit(skip, take, search);
  }

  @Get(':tipo_cedula/:ci_doctor')
  findOne(@Param('tipo_cedula') tipo_cedula: string, @Param('ci_doctor') ci_doctor: string) {
    return this.doctorService.findOne(ci_doctor, tipo_cedula);
  }

  @Put()
  update(@Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(updateDoctorDto);
  }
}
