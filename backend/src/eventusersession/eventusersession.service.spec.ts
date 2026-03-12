import { Test, TestingModule } from '@nestjs/testing';
import { EventusersessionService } from './eventusersession.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { LogoutDto } from '../auth/dto/logout.dto';

describe('EventusersessionService', () => {
  let service: EventusersessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventusersessionService],
    }).compile();

    service = module.get<EventusersessionService>(EventusersessionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createLoginSuccessEvent', () => {
    it('debería loguear el evento de éxito de login (verifica consola)', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const user = { email: 'admin@test.com' } as Usuario;
      
      service.createLoginSuccessEvent(user);
      
      expect(consoleSpy).toHaveBeenCalledWith('Login success event', 'admin@test.com');
      consoleSpy.mockRestore();
    });
  });

  describe('createLogoutEvent', () => {
    it('debería loguear el evento de logout', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const logoutDto = { email: 'user@test.com' } as LogoutDto;
      
      service.createLogoutEvent(logoutDto);
      
      expect(consoleSpy).toHaveBeenCalledWith('Logout event', 'user@test.com');
      consoleSpy.mockRestore();
    });
  });

  describe('createSessionRefreshEvent', () => {
    it('debería loguear el evento de refresco de sesión', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const user = { email: 'refresh@test.com' } as Usuario;
      
      service.createSessionRefreshEvent(user);
      
      expect(consoleSpy).toHaveBeenCalledWith('Session refresh event', 'refresh@test.com');
      consoleSpy.mockRestore();
    });
  });
});
