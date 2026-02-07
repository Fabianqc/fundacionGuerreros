import { Injectable } from '@nestjs/common';
import { CreateNucleoFamiliarDto } from './dto/create-nucleo-familiar.dto';
import { UpdateNucleoFamiliarDto } from './dto/update-nucleo-familiar.dto';

@Injectable()
export class NucleoFamiliarService {
  create(createNucleoFamiliarDto: CreateNucleoFamiliarDto) {
    return 'This action adds a new nucleoFamiliar';
  }

  findAll() {
    return `This action returns all nucleoFamiliar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nucleoFamiliar`;
  }

  update(id: number, updateNucleoFamiliarDto: UpdateNucleoFamiliarDto) {
    return `This action updates a #${id} nucleoFamiliar`;
  }

  remove(id: number) {
    return `This action removes a #${id} nucleoFamiliar`;
  }
}
