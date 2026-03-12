import { Test, TestingModule } from '@nestjs/testing';
import { PersonasService } from './personas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { BadRequestException } from '@nestjs/common';

const mockPersonasRepository = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};

describe('PersonasService', () => {
  let service: PersonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonasService,
        {
          provide: getRepositoryToken(Persona),
          useValue: mockPersonasRepository,
        },
      ],
    }).compile();

    service = module.get<PersonasService>(PersonasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería arrojar "BadRequestException" si la persona ya existe', async () => {
      mockPersonasRepository.findOneBy.mockResolvedValue({ id: '1', cedula: '123' });
      const dto: any = { cedula: '123', tipo_cedula: 'V', sexo: 'M', fullname: 'juan perez' };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('debería arrojar "BadRequestException" si falta el sexo o tipo de cédula', async () => {
      mockPersonasRepository.findOneBy.mockResolvedValue(null);
      const dto: any = { cedula: '123', fullname: 'juan perez' }; // Faltan datos
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('debería capitalizar el nombre y guardar la persona si los datos son correctos', async () => {
      mockPersonasRepository.findOneBy.mockResolvedValue(null);
      mockPersonasRepository.save.mockImplementation((data) => Promise.resolve({ id: '1', ...data }));
      
      const dto: any = { cedula: '123', tipo_cedula: 'V', sexo: 'M', fullname: 'juan perez' };
      const result = await service.create(dto);
      
      expect(result.fullname).toBe('Juan Perez');
      expect(mockPersonasRepository.save).toHaveBeenCalled();
    });
  });

  describe('findByCedula', () => {
    it('debería retornar la persona si existe', async () => {
      const mockPersona = { id: '1', fullname: 'Juan Perez' };
      mockPersonasRepository.findOneBy.mockResolvedValue(mockPersona);
      
      const result = await service.findByCedula({ cedula: '123', tipo_cedula: 'V' });
      expect(result).toEqual(mockPersona);
    });

    it('debería arrojar "BadRequestException" si la persona no existe', async () => {
      mockPersonasRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findByCedula({ cedula: '123', tipo_cedula: 'V' })).rejects.toThrow(BadRequestException);
    });
  });
});
