import { Test, TestingModule } from '@nestjs/testing';
import { PatologiaController } from './patologia.controller';
import { PatologiaService } from './patologia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patologia } from './entities/patologia.entity';
import { BadRequestException } from '@nestjs/common';
import { CreatePatologiaDto } from './dto/create-patologia.dto';

const mockPatologiaRepository = {
  findOneBy: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
}

describe('PatologiaService', () => {
  let service: PatologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:
        [PatologiaService,
          {
            provide: getRepositoryToken(Patologia),
            useValue: mockPatologiaRepository
          }
        ],
    }).compile();

    service = module.get<PatologiaService>(PatologiaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería arrojar "BadRequestException" si la patología ya existe', async () => {
      // Configuramos el mock para simular que YA existe un registro
      mockPatologiaRepository.findOneBy.mockResolvedValue({ id: '1', descripcion: 'Gripe' });
      const dto: CreatePatologiaDto = { name: 'Gripe', riesgo: 'Alto', descripcion: 'Gripe' };

      // Verificamos que al llamar 'create' lance la excepción
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
    it('debería crear y guardar una patología si no existe', async () => {
      // Configuramos el mock para simular que NO existe, y luego retorna el objeto al guardar
      mockPatologiaRepository.findOneBy.mockResolvedValue(null);
      mockPatologiaRepository.save.mockResolvedValue({ id: '1', descripcion: 'Asma' });
      const dto: CreatePatologiaDto = { name: 'Asma', riesgo: 'Alto', descripcion: 'Asma' };
      const res = await service.create(dto);
      expect(mockPatologiaRepository.findOneBy).toHaveBeenCalledWith({ descripcion: 'Asma' });
      expect(mockPatologiaRepository.save).toHaveBeenCalledWith(dto);
      expect(res).toEqual({ id: '1', name: 'Asma' });
    });
  });

  describe('findAll', () => {
    it('debería retornar un arreglo de patologías y su conteo', async () => {
      // Mockeamos el return de find()
      const arr = [{ id: '1', name: 'Asma' }, { id: '2', name: 'Covid' }];
      mockPatologiaRepository.find.mockResolvedValue(arr);
      const result = await service.findAll();
      expect(result).toEqual({ patologias: arr, count: 2 });
      expect(mockPatologiaRepository.find).toHaveBeenCalled();
    });
  });
});
