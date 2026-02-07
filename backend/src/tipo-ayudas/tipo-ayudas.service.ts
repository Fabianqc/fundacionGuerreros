import { Injectable } from '@nestjs/common';
import { CreateTipoAyudaDto } from './dto/create-tipo-ayuda.dto';
import { UpdateTipoAyudaDto } from './dto/update-tipo-ayuda.dto';

@Injectable()
export class TipoAyudasService {
  create(createTipoAyudaDto: CreateTipoAyudaDto) {
    return 'This action adds a new tipoAyuda';
  }

  findAll() {
    return `This action returns all tipoAyudas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoAyuda`;
  }

  update(id: number, updateTipoAyudaDto: UpdateTipoAyudaDto) {
    return `This action updates a #${id} tipoAyuda`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoAyuda`;
  }
}
