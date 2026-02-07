import { PartialType } from '@nestjs/mapped-types';
import { CreateAyudasTecnicaDto } from './create-ayudas-tecnica.dto';

export class UpdateAyudasTecnicaDto extends PartialType(CreateAyudasTecnicaDto) {}
