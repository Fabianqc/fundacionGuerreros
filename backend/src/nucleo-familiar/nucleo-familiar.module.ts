import { Module } from '@nestjs/common';
import { NucleoFamiliarService } from './nucleo-familiar.service';
import { NucleoFamiliarController } from './nucleo-familiar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NucleoFamiliar } from './entities/nucleo-familiar.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Persona } from '../personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NucleoFamiliar, Paciente, Persona])],
  controllers: [NucleoFamiliarController],
  providers: [NucleoFamiliarService],
  exports: [NucleoFamiliarService],
})
export class NucleoFamiliarModule { }
