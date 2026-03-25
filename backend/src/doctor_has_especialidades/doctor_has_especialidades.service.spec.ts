import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHasEspecialidadesService } from './doctor_has_especialidades.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorHasEspecialidade } from './entities/doctor_has_especialidade.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Especialidade } from '../especialidades/entities/especialidade.entity';
import { DataSource } from 'typeorm';

const mockDoctorHasEspecialidadeRepository = {
  find: jest.fn(),
};

const mockDoctorRepository = {};
const mockEspecialidadRepository = {};

const mockManager = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
  manager: mockManager,
};

const mockDataSource = {
  createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
};

describe('DoctorHasEspecialidadesService', () => {
  let service: DoctorHasEspecialidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorHasEspecialidadesService,
        {
          provide: getRepositoryToken(DoctorHasEspecialidade),
          useValue: mockDoctorHasEspecialidadeRepository,
        },
        { provide: getRepositoryToken(Doctor), useValue: mockDoctorRepository },
        {
          provide: getRepositoryToken(Especialidade),
          useValue: mockEspecialidadRepository,
        },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<DoctorHasEspecialidadesService>(
      DoctorHasEspecialidadesService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = {
      ci_doctor: '123',
      tipo_cedula: 'V',
      name_especialidad: ['General'],
    };

    it('debería arrojar "Doctor no encontrado" si no existe el doctor en la BD', async () => {
      mockManager.findOne.mockResolvedValueOnce(null); // Doctor
      await expect(service.create(dto)).rejects.toThrow('Doctor no encontrado');
    });

    it('debería arrojar error si una especialidad no existe', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: 'doc-1' }) // Doctor
        .mockResolvedValueOnce(null); // Especialidad

      await expect(service.create(dto)).rejects.toThrow(
        "Especialidad 'General' no encontrada",
      );
    });

    it('debería guardar la relación si los datos son válidos y no está duplicada', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: 'doc-1' }) // Doctor
        .mockResolvedValueOnce({ id: 'esp-1', nombre: 'General' }) // Especialidad
        .mockResolvedValueOnce(null); // doctorHasEspecialidadExistente (no duplicada)

      mockManager.create.mockReturnValue({
        doctor: { id: 'doc-1' },
        especialidad: { id: 'esp-1' },
      });
      mockManager.find.mockResolvedValue([{ id: 'rel-1' }]);

      const result = await service.create(dto);

      expect(mockManager.save).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
  });
});
