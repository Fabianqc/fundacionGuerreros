import { Module } from '@nestjs/common';
import { TipoAyudasService } from './tipo-ayudas.service';
import { TipoAyudasController } from './tipo-ayudas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAyuda } from './entities/tipo-ayuda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAyuda])],
  controllers: [TipoAyudasController],
  providers: [TipoAyudasService],
})
export class TipoAyudasModule { }
