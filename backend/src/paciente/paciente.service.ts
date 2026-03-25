import { Injectable, BadRequestException } from '@nestjs/common';
import { NucleoFamiliarService } from '../nucleo-familiar/nucleo-familiar.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Like, ILike, Repository } from 'typeorm';
import ActiveUserInterface from 'src/common/interfaces/active-user.interface';
import { Persona } from 'src/personas/entities/persona.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { sendPacientesInterface } from './dto/send-pacientes.interface';

@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly nucleoFamiliarService: NucleoFamiliarService,
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

    const { nucleoFamiliar, ...pacienteData } = createPacienteDto;
    const paciente = this.pacienteRepository.create(pacienteData);
    paciente.persona = persona;
    paciente.usuario = usuario;

    const savedPaciente = await this.pacienteRepository.save(paciente);
    
    if (createPacienteDto.nucleoFamiliar && createPacienteDto.nucleoFamiliar.length > 0) {
      await this.nucleoFamiliarService.registerFamilyMembers(savedPaciente.id.toString(), createPacienteDto.nucleoFamiliar);
    }
    
    return savedPaciente;
  }

  async findOneByCedula(cedula: string, tipo_cedula: string) {
    return await this.pacienteRepository.findOne({
      where: { persona: { cedula, tipo_cedula } },
      relations: ['persona', 'nucleoFamiliar', 'nucleoFamiliar.persona']
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
    const { cedula: _cedula, tipo_cedula: _tipo_cedula, nucleoFamiliar, ...dataToUpdate } = updatePacienteDto;
    await this.pacienteRepository.update(paciente.id, dataToUpdate);

    if (nucleoFamiliar) {
      const existingRelations = await this.nucleoFamiliarService.findByPaciente(paciente.id.toString());
      const incomingIds = nucleoFamiliar.map((nf: any) => nf.personaId);

      // Borrar los que ya no están en la lista
      for (const rel of existingRelations) {
        if (!incomingIds.includes(rel.persona.id)) {
          await this.nucleoFamiliarService.remove(paciente.id.toString(), rel.persona.id.toString());
        }
      }

      if (nucleoFamiliar.length > 0) {
        await this.nucleoFamiliarService.registerFamilyMembers(paciente.id.toString(), nucleoFamiliar);
      }
    }

    return await this.findOneByCedula(cedula, tipo_cedula);
  }

  async findAllWithLimit(skip: number, take: number, search: string) {

    // Implementar el orden de los últimos vistos de la consulta.
    const where = search ? [
      { persona: { fullname: ILike(`%${search}%`) } },
      { persona: { cedula: ILike(`%${search}%`) } },
      { persona: { email: ILike(`%${search}%`) } },
      { persona: { telefono: ILike(`%${search}%`) } },
    ] : {};

    const data = await this.pacienteRepository.find({
      take,
      relations: ['persona'],
      where,
      skip
    });
    const count = await this.pacienteRepository.count({ where });
    const pages = Math.ceil(count / take);
    const pacientes: sendPacientesInterface[] = data.map((data) => {
      return {
        fullname: data.persona.fullname,
        cedula: data.persona.cedula,
        tipo_cedula: data.persona.tipo_cedula,
        email: data.persona.email,
        telefono: data.persona.telefono,
        direccion: data.persona.direccion,
        sexo: data.persona.sexo,
        nacimiento: data.persona.nacimiento,
        ultimavisita: "",
        status: "Activo",
      };
    });

    return { pacientes, count, pages };
  }
}
