import { Injectable } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common'; 

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}

  async create(createEspecialidadeDto: CreateEspecialidadeDto) {
    let especialidad = await this.especialidadeRepository.findOne({ where: { nombre: createEspecialidadeDto.nombre } });
    if (especialidad) {
      throw new BadRequestException('Especialidad ya existe');
    }
    especialidad = await this.especialidadeRepository.create(createEspecialidadeDto);
    return await this.especialidadeRepository.save(especialidad);
  }

  async findAll() {
    return await this.especialidadeRepository.find({order: {nombre: 'ASC'}});
  }

  async update(name: string, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    let especialidad = await this.especialidadeRepository.findOne({ where: { nombre: name } });
    if (!especialidad) {
      throw new BadRequestException('Especialidad no encontrada');
    }
    await this.especialidadeRepository.update(especialidad.id, updateEspecialidadeDto);
    return await this.especialidadeRepository.findOne({ where: { id: especialidad.id } });
  }

  async remove(name: string) {
    let especialidad = await this.especialidadeRepository.findOne({ where: { nombre: name } });
    if (!especialidad) {
      throw new BadRequestException('Especialidad no encontrada');
    }
    let deleteEspecialidad = await this.especialidadeRepository.delete(especialidad.id);
    return deleteEspecialidad;
  }
}
