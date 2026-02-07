import { Module } from '@nestjs/common';
import { AyudasTecnicasService } from './ayudas-tecnicas.service';
import { AyudasTecnicasController } from './ayudas-tecnicas.controller';

@Module({
  controllers: [AyudasTecnicasController],
  providers: [AyudasTecnicasService],
})
export class AyudasTecnicasModule {}
