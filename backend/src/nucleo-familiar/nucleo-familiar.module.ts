import { Module } from '@nestjs/common';
import { NucleoFamiliarService } from './nucleo-familiar.service';
import { NucleoFamiliarController } from './nucleo-familiar.controller';

@Module({
  controllers: [NucleoFamiliarController],
  providers: [NucleoFamiliarService],
})
export class NucleoFamiliarModule {}
