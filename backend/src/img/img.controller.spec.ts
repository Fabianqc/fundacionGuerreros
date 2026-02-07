import { Test, TestingModule } from '@nestjs/testing';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';

describe('ImgController', () => {
  let controller: ImgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgController],
      providers: [ImgService],
    }).compile();

    controller = module.get<ImgController>(ImgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
