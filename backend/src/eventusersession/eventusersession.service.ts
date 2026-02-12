import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/entities/usuario.entity';
import { LogoutDto } from '../auth/dto/logout.dto';

@Injectable()
export class EventusersessionService {
    createLoginSuccessEvent(user: Usuario) {
        console.log('Login success event', user.email);
    }

    createLogoutEvent(logoutDto: LogoutDto) {
        console.log('Logout event', logoutDto.email);
    }

    createSessionRefreshEvent(user: Usuario) {
        console.log('Session refresh event', user.email);
    }
}
