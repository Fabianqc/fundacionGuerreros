import { Test, TestingModule } from '@nestjs/testing';
import { PatologiaController } from './patologia.controller';
import { PatologiaService } from './patologia.service';

describe('PatologiaController', () => {
  let controller: PatologiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatologiaController],
      providers: [PatologiaService],
    }).compile();

    controller = module.get<PatologiaController>(PatologiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
