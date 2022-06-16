import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {JwtPayload} from 'jsonwebtoken';
import {SessionService} from '../session/SessionService';
import {SESSION_SERVICE_PROVIDER} from '../../usecases/interfaces/ISessionService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @Inject(SESSION_SERVICE_PROVIDER) private sessionService: SessionService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.jwtSecretKey'),
        });
    }

    async validate(payload: JwtPayload) {
        const isValid = await this.sessionService.isLoginValid(payload.jti);
        if (!isValid) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
