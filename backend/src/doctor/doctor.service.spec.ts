import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorHorario } from '../doctor-horario/entities/doctor-horario.entity';
import { DataSource } from 'typeorm';
import { DoctorHasEspecialidadesService } from '../doctor_has_especialidades/doctor_has_especialidades.service';
import { BadRequestException } from '@nestjs/common';

const mockDoctorRepository = {
  createQueryBuilder: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

const mockDoctorHorarioRepository = {};

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
  manager: {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  },
};

const mockDataSource = {
  createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
};

const mockDoctorHasEspecialidadesService = {
  create: jest.fn(),
};

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository,
        },
        {
          provide: getRepositoryToken(DoctorHorario),
          useValue: mockDoctorHorarioRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: DoctorHasEspecialidadesService,
          useValue: mockDoctorHasEspecialidadesService,
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería arrojar "BadRequestException" si la persona no existe', async () => {
      mockQueryRunner.manager.findOne.mockResolvedValueOnce(null); // persona

      await expect(service.create({ ci_doctor: '123', tipo_cedula: 'V' } as any)).rejects.toThrow(BadRequestException);
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('debería arrojar "BadRequestException" si el doctor ya existe', async () => {
      mockQueryRunner.manager.findOne
        .mockResolvedValueOnce({ id: 'persona-1' }) // persona
        .mockResolvedValueOnce({ id: 'doctor-1' }); // doctor
        
      await expect(service.create({ ci_doctor: '123', tipo_cedula: 'V' } as any)).rejects.toThrow(BadRequestException);
    });

    it('debería crear el doctor y sus especialidades de forma exitosa', async () => {
      mockQueryRunner.manager.findOne
        .mockResolvedValueOnce({ id: 'persona-1' }) // persona
        .mockResolvedValueOnce(null); // doctor
      
      const mockCreatedDoctor = { id: 'doc-1' };
      mockQueryRunner.manager.create.mockReturnValue(mockCreatedDoctor);

      await service.create({ ci_doctor: '123', tipo_cedula: 'V', especialidades: ['Cardiologia'] } as any);

      expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(mockCreatedDoctor);
      expect(mockDoctorHasEspecialidadesService.create).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería buscar un doctor e instanciar las especialidades como arreglo de strings', async () => {
      const mockDoctor = { 
        id: 'doc-1', 
        doctor_especialidades: [{ especialidad: { nombre: 'General' } }] 
      };
      mockDoctorRepository.findOne.mockResolvedValue(mockDoctor);

      const result = await service.findOne('123', 'V');
      expect(result.id).toEqual('doc-1');
      expect(result.doctor_especialidades).toEqual(['General']);
    });

    it('debería arrojar error si no lo encuentra', async () => {
      mockDoctorRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('123', 'V')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('debería arrojar BadRequestException si falta cédula', async () => {
      await expect(service.update({} as any)).rejects.toThrow(BadRequestException);
    });

    it('debería actualizar el doctor exitosamente', async () => {
      mockQueryRunner.manager.findOne
        .mockResolvedValueOnce({ id: 'persona-1' }) // persona
        .mockResolvedValueOnce({ id: 'doctor-1', licenseNumber: 'old' }); // doctor

      await service.update({ ci_doctor: '123', tipo_cedula: 'V', licenseNumber: 'new', especialidades: ['Cirugia'] });

      expect(mockQueryRunner.manager.save).toHaveBeenCalled();
      expect(mockQueryRunner.manager.delete).toHaveBeenCalled(); // Elimina antiguas especialidades
      expect(mockDoctorHasEspecialidadesService.create).toHaveBeenCalled(); // Crea nuevas
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    });
  });
});
