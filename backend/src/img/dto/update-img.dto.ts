import { PartialType } from '@nestjs/mapped-types';
import { CreateImgDto } from './create-img.dto';

export class UpdateImgDto extends PartialType(CreateImgDto) {}
