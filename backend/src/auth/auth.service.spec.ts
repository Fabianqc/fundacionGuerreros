import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { UsuarioService } from '../usuario/usuario.service';
import { EventusersessionService } from '../eventusersession/eventusersession.service';
import { UnauthorizedException } from '@nestjs/common';

const mockUsersService = {
  findOneByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verifyAsync: jest.fn(),
};

const mockHashingService = {
  compare: jest.fn(),
};

const mockEventusersessionService = {
  createLoginSuccessEvent: jest.fn(),
  createLogoutEvent: jest.fn(),
  createSessionRefreshEvent: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HashingService, useValue: mockHashingService },
        { provide: EventusersessionService, useValue: mockEventusersessionService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('debería arrojar UnauthorizedException si el usuario no existe', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);
      await expect(service.login({ email: 'test@test.com', password: '123' })).rejects.toThrow(UnauthorizedException);
    });

    it('debería arrojar UnauthorizedException si la contraseña no coincide', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue({ email: 'test@test.com', password: 'hashed_password' });
      mockHashingService.compare.mockResolvedValue(false);
      await expect(service.login({ email: 'test@test.com', password: '123' })).rejects.toThrow(UnauthorizedException);
    });

    it('debería generar tokens y registrar el evento si el login es exitoso', async () => {
      const mockUser = { id: '1', email: 'test@test.com', password: 'hashed_password' };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      mockHashingService.compare.mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('token');

      const result = await service.login({ email: 'test@test.com', password: '123' });

      expect(mockEventusersessionService.createLoginSuccessEvent).toHaveBeenCalledWith(mockUser);
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });
  });

  describe('refreshToken', () => {
    it('debería arrojar UnauthorizedException si el token es inválido o falla la verificación', async () => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error());
      await expect(service.refreshToken({ oldToken: 'invalid' })).rejects.toThrow(UnauthorizedException);
    });

    it('debería refrescar el token si el payload es válido y el usuario coincide', async () => {
      const payload = { email: 'test@test.com', sub: '1' };
      mockJwtService.verifyAsync.mockResolvedValue(payload);
      mockUsersService.findOneByEmail.mockResolvedValue({ id: '1', email: 'test@test.com' });
      mockJwtService.sign.mockReturnValue('new_token');

      const result = await service.refreshToken({ oldToken: 'old' });

      expect(mockEventusersessionService.createSessionRefreshEvent).toHaveBeenCalled();
      expect(result.access_token).toBe('new_token');
    });
  });
});
