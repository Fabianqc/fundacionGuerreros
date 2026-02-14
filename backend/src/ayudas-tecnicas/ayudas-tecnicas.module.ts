import { Module } from '@nestjs/common';
import { AyudasTecnicasService } from './ayudas-tecnicas.service';
import { AyudasTecnicasController } from './ayudas-tecnicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AyudasTecnica } from './entities/ayudas-tecnica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AyudasTecnica])],
  controllers: [AyudasTecnicasController],
  providers: [AyudasTecnicasService],
})
export class AyudasTecnicasModule { }
