import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAyudaDto } from './create-tipo-ayuda.dto';

export class UpdateTipoAyudaDto extends PartialType(CreateTipoAyudaDto) {}
