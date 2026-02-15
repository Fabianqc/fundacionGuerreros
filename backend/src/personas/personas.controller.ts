import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindPersonByCedulaDto } from './dto/findPersonByCedula.dto';
import type ActiveUserInterface from '../common/interfaces/active-user.interface';

@Controller('personas')
@UseGuards(AuthGuard('jwt'))
export class PersonasController {
  constructor(private readonly personasService: PersonasService) { }

  @Post()
  create(@ActiveUser() user: ActiveUserInterface, @Body() createPersonaDto: CreatePersonaDto) {
    console.log(user);
    return this.personasService.create(createPersonaDto);
  }

  @Get(':tipo_cedula/:cedula')
  findByCedula(@Param() findPersonByCedulaDto: FindPersonByCedulaDto) {
    console.log(findPersonByCedulaDto);
    return this.personasService.findByCedula(findPersonByCedulaDto);
  }
}
