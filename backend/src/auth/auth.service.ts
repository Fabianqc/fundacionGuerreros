import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EventusersessionService } from '../eventusersession/eventusersession.service';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsuarioService,
        private jwtService: JwtService,
        private hashingService: HashingService,
        private eventusersessionService: EventusersessionService,
    ) { }

    async createToken(email: string, id: string) {
        const payload = { email: email, sub: id };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOneByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!user.password || !loginDto.password) {
            throw new UnauthorizedException('Password is required');
        }

        const isPasswordMatched = await this.hashingService.compare(
            loginDto.password,
            user.password,
        );

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password');
        }

        this.eventusersessionService.createLoginSuccessEvent(user);
        return this.createToken(user.email, user.id);
    }

    // Not exposed via controller, but kept for logic structure
    async register(registerDto: RegisterDto) {
        // Logic not implemented as per request for "Closed System"
        // Ideally this would be called by an Admin Controller
        return { message: 'Registration is closed to public.' };
    }

    async logout(logoutDto: LogoutDto) {
        this.eventusersessionService.createLogoutEvent(logoutDto);
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshTokenDto.oldToken);
            const user = await this.usersService.findOneByEmail(payload.email);
            console.log(user);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            if (user.id !== payload.sub) {
                throw new UnauthorizedException('Invalid token ownership');
            }

            this.eventusersessionService.createSessionRefreshEvent(user);
            return this.createToken(user.email, user.id);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired Refresh Token');
        }
    }
}
