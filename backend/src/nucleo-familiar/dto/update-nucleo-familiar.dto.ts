import { PartialType } from '@nestjs/mapped-types';
import { CreateNucleoFamiliarDto } from './create-nucleo-familiar.dto';

export class UpdateNucleoFamiliarDto extends PartialType(CreateNucleoFamiliarDto) {}
