import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './entities/img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Img])],
  controllers: [ImgController],
  providers: [ImgService],
})
export class ImgModule { }
