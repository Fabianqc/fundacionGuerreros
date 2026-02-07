import { Test, TestingModule } from '@nestjs/testing';
import { TipoAyudasController } from './tipo-ayudas.controller';
import { TipoAyudasService } from './tipo-ayudas.service';

describe('TipoAyudasController', () => {
  let controller: TipoAyudasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAyudasController],
      providers: [TipoAyudasService],
    }).compile();

    controller = module.get<TipoAyudasController>(TipoAyudasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
