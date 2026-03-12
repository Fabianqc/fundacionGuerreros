import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadesService } from './especialidades.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { BadRequestException } from '@nestjs/common';

const mockEspecialidadRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('EspecialidadesService', () => {
  let service: EspecialidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspecialidadesService,
        {
          provide: getRepositoryToken(Especialidade),
          useValue: mockEspecialidadRepository,
        },
      ],
    }).compile();

    service = module.get<EspecialidadesService>(EspecialidadesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería arrojar "BadRequestException" si la especialidad ya existe', async () => {
      mockEspecialidadRepository.findOne.mockResolvedValue({ id: '1', nombre: 'Pediatria' });
      const dto: any = { nombre: 'Pediatria' };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('debería crear y guardar una especialidad si no existe', async () => {
      mockEspecialidadRepository.findOne.mockResolvedValue(null);
      mockEspecialidadRepository.create.mockReturnValue({ id: '1', nombre: 'Cirugia' });
      mockEspecialidadRepository.save.mockResolvedValue({ id: '1', nombre: 'Cirugia' });
      
      const dto: any = { nombre: 'Cirugia' };
      const res = await service.create(dto);
      
      expect(mockEspecialidadRepository.findOne).toHaveBeenCalledWith({ where: { nombre: 'Cirugia' }});
      expect(mockEspecialidadRepository.create).toHaveBeenCalledWith(dto);
      expect(mockEspecialidadRepository.save).toHaveBeenCalled();
      expect(res.nombre).toBe('Cirugia');
    });
  });

  describe('findAll', () => {
    it('debería listar todas las especialidades ordenadas', async () => {
      const arr = [{ id: '1', nombre: 'A' }, { id: '2', nombre: 'B' }];
      mockEspecialidadRepository.find.mockResolvedValue(arr);

      const result = await service.findAll();
      
      expect(result).toEqual(arr);
      expect(mockEspecialidadRepository.find).toHaveBeenCalledWith({ order: { nombre: 'ASC' }});
    });
  });

  describe('update', () => {
    it('debería arrojar error si la especialidad a actualizar no existe', async () => {
      mockEspecialidadRepository.findOne.mockResolvedValue(null);
      await expect(service.update('Falsa', {} as any)).rejects.toThrow(BadRequestException);
    });

    it('debería actualizar la especialidad correctamente', async () => {
      mockEspecialidadRepository.findOne
        .mockResolvedValueOnce({ id: '1', nombre: 'Vieja' }) // primer findOne
        .mockResolvedValueOnce({ id: '1', nombre: 'Nueva' }); // segundo findOne tras update

      const res = await service.update('Vieja', { nombre: 'Nueva' });
      
      expect(mockEspecialidadRepository.update).toHaveBeenCalledWith('1', { nombre: 'Nueva' });
      expect(res.nombre).toBe('Nueva');
    });
  });

  describe('remove', () => {
    it('debería arrojar error si la especialidad a eliminar no existe', async () => {
      mockEspecialidadRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('Falsa')).rejects.toThrow(BadRequestException);
    });

    it('debería eliminar la especialidad correctamente', async () => {
      mockEspecialidadRepository.findOne.mockResolvedValue({ id: '1', nombre: 'PorBorrar' });
      mockEspecialidadRepository.delete.mockResolvedValue({ affected: 1 });

      const res = await service.remove('PorBorrar');
      
      expect(mockEspecialidadRepository.delete).toHaveBeenCalledWith('1');
      expect(res).toEqual({ affected: 1 });
    });
  });
});
