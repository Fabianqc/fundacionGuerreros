import { Module } from '@nestjs/common';
import { NucleoFamiliarService } from './nucleo-familiar.service';
import { NucleoFamiliarController } from './nucleo-familiar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NucleoFamiliar } from './entities/nucleo-familiar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NucleoFamiliar])],
  controllers: [NucleoFamiliarController],
  providers: [NucleoFamiliarService],
})
export class NucleoFamiliarModule { }
