import { Injectable } from '@nestjs/common';
import { CreatePatologiaDto } from './dto/create-patologia.dto';
import { UpdatePatologiaDto } from './dto/update-patologia.dto';

@Injectable()
export class PatologiaService {
  create(createPatologiaDto: CreatePatologiaDto) {
    return 'This action adds a new patologia';
  }

  findAll() {
    return `This action returns all patologia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patologia`;
  }

  update(id: number, updatePatologiaDto: UpdatePatologiaDto) {
    return `This action updates a #${id} patologia`;
  }

  remove(id: number) {
    return `This action removes a #${id} patologia`;
  }
}
