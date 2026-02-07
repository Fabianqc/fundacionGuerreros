import { Injectable } from '@nestjs/common';
import { CreateAyudasTecnicaDto } from './dto/create-ayudas-tecnica.dto';
import { UpdateAyudasTecnicaDto } from './dto/update-ayudas-tecnica.dto';

@Injectable()
export class AyudasTecnicasService {
  create(createAyudasTecnicaDto: CreateAyudasTecnicaDto) {
    return 'This action adds a new ayudasTecnica';
  }

  findAll() {
    return `This action returns all ayudasTecnicas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ayudasTecnica`;
  }

  update(id: number, updateAyudasTecnicaDto: UpdateAyudasTecnicaDto) {
    return `This action updates a #${id} ayudasTecnica`;
  }

  remove(id: number) {
    return `This action removes a #${id} ayudasTecnica`;
  }
}
