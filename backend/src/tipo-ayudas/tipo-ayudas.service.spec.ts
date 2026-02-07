import { Test, TestingModule } from '@nestjs/testing';
import { TipoAyudasService } from './tipo-ayudas.service';

describe('TipoAyudasService', () => {
  let service: TipoAyudasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAyudasService],
    }).compile();

    service = module.get<TipoAyudasService>(TipoAyudasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
