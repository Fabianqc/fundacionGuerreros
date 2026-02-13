import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')

export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}



}
