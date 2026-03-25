import { Controller } from '@nestjs/common';
import { NucleoFamiliarService } from './nucleo-familiar.service';
@Controller('nucleo-familiar')
export class NucleoFamiliarController {
  constructor(private readonly nucleoFamiliarService: NucleoFamiliarService) {}
}
