import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoAyudasService } from './tipo-ayudas.service';
import { CreateTipoAyudaDto } from './dto/create-tipo-ayuda.dto';
import { UpdateTipoAyudaDto } from './dto/update-tipo-ayuda.dto';

@Controller('tipo-ayudas')
export class TipoAyudasController {
  constructor(private readonly tipoAyudasService: TipoAyudasService) {}

  @Post()
  create(@Body() createTipoAyudaDto: CreateTipoAyudaDto) {
    return this.tipoAyudasService.create(createTipoAyudaDto);
  }

  @Get()
  findAll() {
    return this.tipoAyudasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAyudasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoAyudaDto: UpdateTipoAyudaDto) {
    return this.tipoAyudasService.update(+id, updateTipoAyudaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAyudasService.remove(+id);
  }
}
