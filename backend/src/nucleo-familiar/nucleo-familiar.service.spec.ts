import { Test, TestingModule } from '@nestjs/testing';
import { NucleoFamiliarService } from './nucleo-familiar.service';

describe('NucleoFamiliarService', () => {
  let service: NucleoFamiliarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NucleoFamiliarService],
    }).compile();

    service = module.get<NucleoFamiliarService>(NucleoFamiliarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
