import { Module } from '@nestjs/common';
import { TipoAyudasService } from './tipo-ayudas.service';
import { TipoAyudasController } from './tipo-ayudas.controller';

@Module({
  controllers: [TipoAyudasController],
  providers: [TipoAyudasService],
})
export class TipoAyudasModule {}
