import { Test, TestingModule } from '@nestjs/testing';
import { AyudasTecnicasService } from './ayudas-tecnicas.service';

describe('AyudasTecnicasService', () => {
  let service: AyudasTecnicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AyudasTecnicasService],
    }).compile();

    service = module.get<AyudasTecnicasService>(AyudasTecnicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
