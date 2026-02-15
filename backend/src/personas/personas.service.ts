import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { FindPersonByCedulaDto } from './dto/findPersonByCedula.dto';

@Injectable()
export class PersonasService {
 
    constructor(
        @InjectRepository(Persona)
        private readonly personasRepository: Repository<Persona>
    ){}

    async create(createPersonaDto: CreatePersonaDto) {
        let persona = await this.personasRepository.findOneBy({
            cedula: createPersonaDto.cedula,
            tipo_cedula: createPersonaDto.tipo_cedula
        })

        if (persona) {
            throw new BadRequestException('La persona ya existe');
        }

        if (!createPersonaDto.sexo || !createPersonaDto.tipo_cedula) {
            throw new BadRequestException('El sexo y el tipo de cedula son obligatorios');
        }

        return await this.personasRepository.save(createPersonaDto);
    }

    async findByCedula(findPersonByCedulaDto: FindPersonByCedulaDto) {
        let persona = await this.personasRepository.findOneBy({
            cedula: findPersonByCedulaDto.cedula,
            tipo_cedula: findPersonByCedulaDto.tipo_cedula
        });

        if (!persona) {
            throw new BadRequestException('La persona no existe');
        }
        return persona;
    }
}
