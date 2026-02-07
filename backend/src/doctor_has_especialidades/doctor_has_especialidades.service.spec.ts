import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';

describe('DoctorHasEspecialidadesService', () => {
  let service: DoctorHasEspecialidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorHasEspecialidadesService],
    }).compile();

    service = module.get<DoctorHasEspecialidadesService>(DoctorHasEspecialidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
