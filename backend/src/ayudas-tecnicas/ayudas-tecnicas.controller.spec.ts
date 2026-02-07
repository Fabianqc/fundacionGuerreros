import { Test, TestingModule } from '@nestjs/testing';
import { AyudasTecnicasController } from './ayudas-tecnicas.controller';
import { AyudasTecnicasService } from './ayudas-tecnicas.service';

describe('AyudasTecnicasController', () => {
  let controller: AyudasTecnicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AyudasTecnicasController],
      providers: [AyudasTecnicasService],
    }).compile();

    controller = module.get<AyudasTecnicasController>(AyudasTecnicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
