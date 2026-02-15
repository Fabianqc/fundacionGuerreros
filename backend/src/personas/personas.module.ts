import { Module, BadRequestException } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona, BadRequestException])],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule { }
