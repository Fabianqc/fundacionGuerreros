import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatologiaService } from './patologia.service';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';

@Controller('patologia')
export class PatologiaController {
  constructor(private readonly patologiaService: PatologiaService) {}

  @Post()
  create(@Body() createPatologiaDto: CreatePatologiaDto) {
    return this.patologiaService.create(createPatologiaDto);
  }

  @Get()
  findAll() {
    return this.patologiaService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updatePatologiaDto: UpdatePatologiaDto) {
    return this.patologiaService.update(name, updatePatologiaDto);
  }

}
