import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHorarioController } from './doctor-horario.controller';
import { DoctorHorarioService } from './doctor-horario.service';

describe('DoctorHorarioController', () => {
  let controller: DoctorHorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorHorarioController],
      providers: [DoctorHorarioService],
    }).compile();

    controller = module.get<DoctorHorarioController>(DoctorHorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
