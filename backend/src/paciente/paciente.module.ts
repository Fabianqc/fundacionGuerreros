import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { AyudasTecnica } from 'src/ayudas-tecnicas/entities/ayudas-tecnica.entity';
import { NucleoFamiliar } from 'src/nucleo-familiar/entities/nucleo-familiar.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Persona } from 'src/personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Consulta, AyudasTecnica, NucleoFamiliar, Usuario, Persona])],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule { }
