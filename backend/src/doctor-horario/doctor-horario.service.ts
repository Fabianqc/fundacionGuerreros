import { Injectable } from '@nestjs/common';
import { CreateDoctorHorarioDto } from './dto/create-doctor-horario.dto';
import { UpdateDoctorHorarioDto } from './dto/update-doctor-horario.dto';

@Injectable()
export class DoctorHorarioService {
  create(createDoctorHorarioDto: CreateDoctorHorarioDto) {
    return 'This action adds a new doctorHorario';
  }

  findAll() {
    return `This action returns all doctorHorario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorHorario`;
  }

  update(id: number, updateDoctorHorarioDto: UpdateDoctorHorarioDto) {
    return `This action updates a #${id} doctorHorario`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorHorario`;
  }
}
