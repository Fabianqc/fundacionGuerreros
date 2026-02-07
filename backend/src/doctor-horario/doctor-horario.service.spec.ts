import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHorarioService } from './doctor-horario.service';

describe('DoctorHorarioService', () => {
  let service: DoctorHorarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorHorarioService],
    }).compile();

    service = module.get<DoctorHorarioService>(DoctorHorarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
