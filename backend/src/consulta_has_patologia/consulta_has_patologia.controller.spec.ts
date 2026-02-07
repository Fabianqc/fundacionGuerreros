import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaHasPatologiaController } from './consulta_has_patologia.controller';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';

describe('ConsultaHasPatologiaController', () => {
  let controller: ConsultaHasPatologiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultaHasPatologiaController],
      providers: [ConsultaHasPatologiaService],
    }).compile();

    controller = module.get<ConsultaHasPatologiaController>(ConsultaHasPatologiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
