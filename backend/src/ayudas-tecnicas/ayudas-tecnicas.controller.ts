import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AyudasTecnicasService } from './ayudas-tecnicas.service';
import { CreateAyudasTecnicaDto } from './dto/create-ayudas-tecnica.dto';
import { UpdateAyudasTecnicaDto } from './dto/update-ayudas-tecnica.dto';

@Controller('ayudas-tecnicas')
export class AyudasTecnicasController {
  constructor(private readonly ayudasTecnicasService: AyudasTecnicasService) {}

  @Post()
  create(@Body() createAyudasTecnicaDto: CreateAyudasTecnicaDto) {
    return this.ayudasTecnicasService.create(createAyudasTecnicaDto);
  }

  @Get()
  findAll() {
    return this.ayudasTecnicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ayudasTecnicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAyudasTecnicaDto: UpdateAyudasTecnicaDto) {
    return this.ayudasTecnicasService.update(+id, updateAyudasTecnicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ayudasTecnicasService.remove(+id);
  }
}
