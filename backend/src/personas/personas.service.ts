import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

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
            throw new Error('Persona ya existe');
        }
        return await this.personasRepository.save(createPersonaDto);
    }

    
}
