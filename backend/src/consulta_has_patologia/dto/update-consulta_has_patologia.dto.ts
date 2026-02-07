import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultaHasPatologiaDto } from './create-consulta_has_patologia.dto';

export class UpdateConsultaHasPatologiaDto extends PartialType(CreateConsultaHasPatologiaDto) {}
