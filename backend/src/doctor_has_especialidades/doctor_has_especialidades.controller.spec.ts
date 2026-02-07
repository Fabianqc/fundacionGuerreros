import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHasEspecialidadesController } from './doctor_has_especialidades.controller';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';

describe('DoctorHasEspecialidadesController', () => {
  let controller: DoctorHasEspecialidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorHasEspecialidadesController],
      providers: [DoctorHasEspecialidadesService],
    }).compile();

    controller = module.get<DoctorHasEspecialidadesController>(DoctorHasEspecialidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
