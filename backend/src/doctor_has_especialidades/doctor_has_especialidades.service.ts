import { Injectable } from '@nestjs/common';
import { CreateDoctorHasEspecialidadeDto } from './dto/create-doctor_has_especialidade.dto';
import { UpdateDoctorHasEspecialidadeDto } from './dto/update-doctor_has_especialidade.dto';

@Injectable()
export class DoctorHasEspecialidadesService {
  create(createDoctorHasEspecialidadeDto: CreateDoctorHasEspecialidadeDto) {
    return 'This action adds a new doctorHasEspecialidade';
  }

  findAll() {
    return `This action returns all doctorHasEspecialidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorHasEspecialidade`;
  }

  update(id: number, updateDoctorHasEspecialidadeDto: UpdateDoctorHasEspecialidadeDto) {
    return `This action updates a #${id} doctorHasEspecialidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorHasEspecialidade`;
  }
}
