import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import type ActiveUserInterface from 'src/common/interfaces/active-user.interface';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('paciente')
@UseGuards(AuthGuard('jwt'))
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) { }

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto, @ActiveUser() activeUser: ActiveUserInterface) {
    console.log(createPacienteDto);
    return this.pacienteService.create(createPacienteDto, activeUser);
  }

  @Get(':cedula/:tipo_cedula')
  findOneByCedula(@Param('cedula') cedula: string, @Param('tipo_cedula') tipo_cedula: string) {
    return this.pacienteService.findOneByCedula(cedula, tipo_cedula);
  }

  @Patch(':cedula/:tipo_cedula')
  update(@Param('cedula') cedula: string, @Param('tipo_cedula') tipo_cedula: string, @Body() updatePacienteDto: UpdatePacienteDto, @ActiveUser() activeUser: ActiveUserInterface) {
    return this.pacienteService.update(cedula, tipo_cedula, updatePacienteDto, activeUser);
  }
}
