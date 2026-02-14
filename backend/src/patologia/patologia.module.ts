import { Module } from '@nestjs/common';
import { PatologiaService } from './patologia.service';
import { PatologiaController } from './patologia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patologia } from './entities/patologia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patologia])],
  controllers: [PatologiaController],
  providers: [PatologiaService],
})
export class PatologiaModule { }
