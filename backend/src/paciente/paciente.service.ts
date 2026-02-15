import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import ActiveUserInterface from 'src/common/interfaces/active-user.interface';
import { Persona } from 'src/personas/entities/persona.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createPacienteDto: CreatePacienteDto, activeUser: ActiveUserInterface) {
    const persona = await this.personaRepository.findOneBy({
      cedula: createPacienteDto.cedula,
      tipo_cedula: createPacienteDto.tipo_cedula
    });

    const usuario = await this.usuarioRepository.findOneBy({
      id: activeUser.sub
    });

    if (!usuario) {
      throw new BadRequestException('El usuario no existe. Debe registrarlo primero.');
    }

    if (!persona) {
      throw new BadRequestException('La persona no existe. Debe registrarla primero.');
    }

    const paciente = this.pacienteRepository.create(createPacienteDto);
    paciente.persona = persona;
    paciente.usuario = usuario;

    return await this.pacienteRepository.save(paciente);
  }

  async findOneByCedula(cedula: string, tipo_cedula: string) {
    return await this.pacienteRepository.findOne({
      where: { persona: { cedula, tipo_cedula } },
      relations: ['persona']
    });
  }

  async update(cedula: string, tipo_cedula: string, updatePacienteDto: UpdatePacienteDto, activeUser: ActiveUserInterface) {
    const paciente = await this.findOneByCedula(cedula, tipo_cedula);
    if (!paciente) {
      throw new BadRequestException('El paciente no existe. Debe registrarlo primero.');
    }
    const usuario = await this.usuarioRepository.findOneBy({
      id: activeUser.sub
    });
    if (!usuario) {
      throw new BadRequestException('El usuario no existe. Debe registrarlo primero.');
    }
    const { cedula: _cedula, tipo_cedula: _tipo_cedula, ...dataToUpdate } = updatePacienteDto;
    return await this.pacienteRepository.update(paciente.id, dataToUpdate);
  }

}
