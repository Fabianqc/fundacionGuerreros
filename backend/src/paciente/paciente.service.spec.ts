import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Persona } from '../personas/entities/persona.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { BadRequestException } from '@nestjs/common';

const mockPacienteRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
};

const mockPersonaRepository = {
  findOneBy: jest.fn(),
};

const mockUsuarioRepository = {
  findOneBy: jest.fn(),
};

describe('PacienteService', () => {
  let service: PacienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockPacienteRepository,
        },
        {
          provide: getRepositoryToken(Persona),
          useValue: mockPersonaRepository,
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockActiveUser = { sub: 'user-id', iat: 1, exp: 2 };

    it('debería arrojar "BadRequestException" si el usuario no existe', async () => {
      mockPersonaRepository.findOneBy.mockResolvedValue({ id: 'persona-1' });
      mockUsuarioRepository.findOneBy.mockResolvedValue(null);
      await expect(service.create({ cedula: '123', tipo_cedula: 'V' } as any, mockActiveUser as any)).rejects.toThrow(BadRequestException);
    });

    it('debería arrojar "BadRequestException" si la persona no existe', async () => {
      mockPersonaRepository.findOneBy.mockResolvedValue(null);
      mockUsuarioRepository.findOneBy.mockResolvedValue({ id: 'user-id' });
      await expect(service.create({ cedula: '123', tipo_cedula: 'V' } as any, mockActiveUser as any)).rejects.toThrow(BadRequestException);
    });

    it('debería asociar persona y usuario, luego guardar el paciente', async () => {
      mockPersonaRepository.findOneBy.mockResolvedValue({ id: 'persona-1' });
      mockUsuarioRepository.findOneBy.mockResolvedValue({ id: 'user-id' });
      
      const mockCreatedPaciente = { id: 'paciente-1' };
      mockPacienteRepository.create.mockReturnValue(mockCreatedPaciente);
      mockPacienteRepository.save.mockResolvedValue(mockCreatedPaciente);

      const result = await service.create({ cedula: '123', tipo_cedula: 'V' } as any, mockActiveUser as any);
      
      expect(mockPacienteRepository.create).toHaveBeenCalled();
      expect(mockCreatedPaciente['persona']).toBeDefined();
      expect(mockPacienteRepository.save).toHaveBeenCalledWith(mockCreatedPaciente);
      expect(result).toEqual(mockCreatedPaciente);
    });
  });

  describe('findOneByCedula', () => {
    it('debería buscar al paciente por cédula junto a su relación persona', async () => {
      mockPacienteRepository.findOne.mockResolvedValue({ id: 'paciente-1' });
      const result = await service.findOneByCedula('123', 'V');
      expect(mockPacienteRepository.findOne).toHaveBeenCalledWith({
        where: { persona: { cedula: '123', tipo_cedula: 'V' } },
        relations: ['persona']
      });
      expect(result).toEqual({ id: 'paciente-1' });
    });
  });

  describe('update', () => {
    const mockActiveUser = { sub: 'user-id' };
    it('debería arrojar "BadRequestException" si el paciente no existe', async () => {
      mockPacienteRepository.findOne.mockResolvedValue(null); // findOneByCedula returns null
      await expect(service.update('123', 'V', {} as any, mockActiveUser as any)).rejects.toThrow(BadRequestException);
    });
    // Add additional update tests if necessary
  });

  describe('findAllWithLimit', () => {
    it('debería retornar pacientes mapeados con paginación', async () => {
      mockPacienteRepository.find.mockResolvedValue([
        { persona: { fullname: 'a', cedula: '1', tipo_cedula: 'V', email: 'e', telefono: 't' } }
      ]);
      mockPacienteRepository.count.mockResolvedValue(1);

      const result = await service.findAllWithLimit(0, 10, '');
      
      expect(result.count).toBe(1);
      expect(result.pages).toBe(1);
      expect(result.pacientes[0].Fullname).toBe('a');
      expect(mockPacienteRepository.find).toHaveBeenCalled();
    });
  });
});
