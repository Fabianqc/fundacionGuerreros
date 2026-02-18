import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patologia } from './entities/patologia.entity';
import { Repository } from 'typeorm';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';
@Injectable()
export class PatologiaService {
  constructor(
    @InjectRepository(Patologia)
    private readonly patologiaRepository: Repository<Patologia>
  ) { }

  async create(createPatologiaDto: CreatePatologiaDto) {
    let patologia = await this.patologiaRepository.findOneBy({
      name: createPatologiaDto.name
    });
    if (patologia) {
      throw new BadRequestException('La patologia ya existe');
    }
    return await this.patologiaRepository.save(createPatologiaDto);
  }

  async findAll() {
    //THE NUMBER OF PATIENTS NEEDS TO BE DEVELOPED
    let patologias = await this.patologiaRepository.find();
    return {patologias, count: patologias.length};
  }

  async update(name: string, updatePatologiaDto: UpdatePatologiaDto) {
    let patologia = await this.patologiaRepository.findOneBy({ name });
    if (!patologia) {
      throw new BadRequestException('La patologia no existe');
    }
    return await this.patologiaRepository.update({name}, updatePatologiaDto);
  }

  async remove(id: string) {

  }
}
