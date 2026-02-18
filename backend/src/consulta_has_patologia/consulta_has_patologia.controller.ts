import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';
import { CreateConsultaHasPatologiaDto } from './dto/create-consulta_has_patologia.dto';
import { UpdateConsultaHasPatologiaDto } from './dto/update-consulta_has_patologia.dto';

@Controller('consulta-has-patologia')
export class ConsultaHasPatologiaController {
  constructor(private readonly consultaHasPatologiaService: ConsultaHasPatologiaService) {}

}
