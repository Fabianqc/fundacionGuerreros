import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('especialidades')
@UseGuards(AuthGuard('jwt'))
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return this.especialidadesService.create(createEspecialidadeDto);
  }

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return this.especialidadesService.update(name, updateEspecialidadeDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.especialidadesService.remove(name);
  }
}
