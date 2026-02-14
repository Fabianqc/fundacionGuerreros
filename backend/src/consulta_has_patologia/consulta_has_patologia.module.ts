import { Module } from '@nestjs/common';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';
import { ConsultaHasPatologiaController } from './consulta_has_patologia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaHasPatologia } from './entities/consulta_has_patologia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultaHasPatologia])],
  controllers: [ConsultaHasPatologiaController],
  providers: [ConsultaHasPatologiaService],
})
export class ConsultaHasPatologiaModule { }
