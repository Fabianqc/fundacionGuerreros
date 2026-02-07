import { Injectable } from '@nestjs/common';
import { CreateConsultaHasPatologiaDto } from './dto/create-consulta_has_patologia.dto';
import { UpdateConsultaHasPatologiaDto } from './dto/update-consulta_has_patologia.dto';

@Injectable()
export class ConsultaHasPatologiaService {
  create(createConsultaHasPatologiaDto: CreateConsultaHasPatologiaDto) {
    return 'This action adds a new consultaHasPatologia';
  }

  findAll() {
    return `This action returns all consultaHasPatologia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultaHasPatologia`;
  }

  update(id: number, updateConsultaHasPatologiaDto: UpdateConsultaHasPatologiaDto) {
    return `This action updates a #${id} consultaHasPatologia`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultaHasPatologia`;
  }
}
