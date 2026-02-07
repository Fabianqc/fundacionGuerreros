import { Module } from '@nestjs/common';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';
import { ConsultaHasPatologiaController } from './consulta_has_patologia.controller';

@Module({
  controllers: [ConsultaHasPatologiaController],
  providers: [ConsultaHasPatologiaService],
})
export class ConsultaHasPatologiaModule {}
