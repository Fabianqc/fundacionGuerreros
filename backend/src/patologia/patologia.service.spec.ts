import { Test, TestingModule } from '@nestjs/testing';
import { PatologiaService } from './patologia.service';

describe('PatologiaService', () => {
  let service: PatologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatologiaService],
    }).compile();

    service = module.get<PatologiaService>(PatologiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
