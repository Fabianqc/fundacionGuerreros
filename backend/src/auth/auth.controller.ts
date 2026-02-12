import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';
import { JwtAuthGuard } from '../common/guards/api-key/jwt-auth.guard';
import { ActiveUser } from '../common/decorators/active-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@ActiveUser() user: any) {
        // Create LogoutDto from active user
        const logoutDto: LogoutDto = {
            userId: user.userId,
            email: user.email
        };
        return this.authService.logout(logoutDto);
    }

    @Post('refresh')
    async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
}
