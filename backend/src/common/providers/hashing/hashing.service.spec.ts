import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';
import * as argon2 from 'argon2';

jest.mock('argon2');

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('debería llamar a argon2.hash con la data proveída', async () => {
      const data = 'password123';
      const expectedHash = 'hashed_password';
      (argon2.hash as jest.Mock).mockResolvedValue(expectedHash);

      const result = await service.hash(data);

      expect(argon2.hash).toHaveBeenCalledWith(data);
      expect(result).toBe(expectedHash);
    });
  });

  describe('compare', () => {
    it('debería llamar a argon2.verify y retornar true si coinciden', async () => {
      const data = 'password123';
      const hash = 'hashed_password';
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      const result = await service.compare(data, hash);

      expect(argon2.verify).toHaveBeenCalledWith(hash, data);
      expect(result).toBe(true);
    });

    it('debería manejar Buffers convirtiéndolos a string si es necesario', async () => {
      const data = 'password123';
      const hashBuffer = Buffer.from('hashed_password');
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      const result = await service.compare(data, hashBuffer);

      expect(argon2.verify).toHaveBeenCalledWith('hashed_password', data);
      expect(result).toBe(true);
    });
  });
});
