import { Test, TestingModule } from '@nestjs/testing';
import { NucleoFamiliarController } from './nucleo-familiar.controller';
import { NucleoFamiliarService } from './nucleo-familiar.service';

describe('NucleoFamiliarController', () => {
  let controller: NucleoFamiliarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NucleoFamiliarController],
      providers: [NucleoFamiliarService],
    }).compile();

    controller = module.get<NucleoFamiliarController>(NucleoFamiliarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
