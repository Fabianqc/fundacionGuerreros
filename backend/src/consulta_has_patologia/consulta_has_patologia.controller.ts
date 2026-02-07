import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';
import { CreateConsultaHasPatologiaDto } from './dto/create-consulta_has_patologia.dto';
import { UpdateConsultaHasPatologiaDto } from './dto/update-consulta_has_patologia.dto';

@Controller('consulta-has-patologia')
export class ConsultaHasPatologiaController {
  constructor(private readonly consultaHasPatologiaService: ConsultaHasPatologiaService) {}

  @Post()
  create(@Body() createConsultaHasPatologiaDto: CreateConsultaHasPatologiaDto) {
    return this.consultaHasPatologiaService.create(createConsultaHasPatologiaDto);
  }

  @Get()
  findAll() {
    return this.consultaHasPatologiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaHasPatologiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultaHasPatologiaDto: UpdateConsultaHasPatologiaDto) {
    return this.consultaHasPatologiaService.update(+id, updateConsultaHasPatologiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaHasPatologiaService.remove(+id);
  }
}
