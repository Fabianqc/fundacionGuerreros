import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface PayloadToken {
    sub: number;
    email: string;
    nivel: number;
    exp?: number;
    iat?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'), // Changed to JWT_SECRET as per common convention, user can update env
        });
    }
    async validate(payload: PayloadToken) {
        return { userId: payload.sub, email: payload.email, nivel: payload.nivel };
    }
}
