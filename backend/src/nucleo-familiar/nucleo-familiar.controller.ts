import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NucleoFamiliarService } from './nucleo-familiar.service';
import { CreateNucleoFamiliarDto } from './dto/create-nucleo-familiar.dto';
import { UpdateNucleoFamiliarDto } from './dto/update-nucleo-familiar.dto';

@Controller('nucleo-familiar')
export class NucleoFamiliarController {
  constructor(private readonly nucleoFamiliarService: NucleoFamiliarService) {}

  @Post()
  create(@Body() createNucleoFamiliarDto: CreateNucleoFamiliarDto) {
    return this.nucleoFamiliarService.create(createNucleoFamiliarDto);
  }

  @Get()
  findAll() {
    return this.nucleoFamiliarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nucleoFamiliarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNucleoFamiliarDto: UpdateNucleoFamiliarDto) {
    return this.nucleoFamiliarService.update(+id, updateNucleoFamiliarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nucleoFamiliarService.remove(+id);
  }
}
