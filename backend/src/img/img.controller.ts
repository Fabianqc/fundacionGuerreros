import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImgService } from './img.service';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  create(@Body() createImgDto: CreateImgDto) {
    return this.imgService.create(createImgDto);
  }

  @Get()
  findAll() {
    return this.imgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgDto: UpdateImgDto) {
    return this.imgService.update(+id, updateImgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}
