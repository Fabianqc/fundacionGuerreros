import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

const mockUsuarioRepository = {
  findOne: jest.fn(),
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('debería retornar el usuario a partir del id', async () => {
      const mockResult = { id: 'uuid-1', email: 'test@test.com' };
      mockUsuarioRepository.findOne.mockResolvedValue(mockResult);

      const result = await service.findOne('uuid-1' as any);
      
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1' }});
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOneByEmail', () => {
    it('debería retornar un usuario a partir de su email', async () => {
      const mockResult = { id: 'uuid-2', email: 'hello@test.com' };
      mockUsuarioRepository.findOne.mockResolvedValue(mockResult);

      const result = await service.findOneByEmail('hello@test.com');
      
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { email: 'hello@test.com' }});
      expect(result).toEqual(mockResult);
    });
  });
});
