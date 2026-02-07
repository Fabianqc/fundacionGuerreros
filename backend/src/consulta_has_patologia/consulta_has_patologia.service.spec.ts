import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaHasPatologiaService } from './consulta_has_patologia.service';

describe('ConsultaHasPatologiaService', () => {
  let service: ConsultaHasPatologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultaHasPatologiaService],
    }).compile();

    service = module.get<ConsultaHasPatologiaService>(ConsultaHasPatologiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
