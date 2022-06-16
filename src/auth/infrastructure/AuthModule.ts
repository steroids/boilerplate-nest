import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthController} from './controllers/AuthController';
import {LocalStrategy} from './strategies/LocalStrategy';
import {JwtStrategy} from './strategies/JwtStrategy';
import {UserModule} from '../../user/infrastructure/UserModule';
import {AUTH_LOGIN_REPOSITORY_PROVIDER_NAME} from '../usecases/interfaces/IAuthLoginRepository';
import {AuthLoginRepository} from './repositories/AuthLoginRepository';
import {AuthLoginTable} from './tables/AuthLoginTable';
import {SessionService} from './session/SessionService';
import {SESSION_SERVICE_PROVIDER} from '../usecases/interfaces/ISessionService';
import {AuthService} from '../usecases/services/AuthService';
import {UserService} from '../../user/usecases/services/UserService';
import {EncryptService} from '../usecases/services/EncryptService';

const authLoginRepositoryProvider = {
    provide: AUTH_LOGIN_REPOSITORY_PROVIDER_NAME,
    useClass: AuthLoginRepository,
};

const sessionServiceProvider = {
    provide: SESSION_SERVICE_PROVIDER,
    useClass: SessionService,
};

const AuthServiceProvider = {
    inject: [
        UserService,
        SESSION_SERVICE_PROVIDER,
    ],
    provide: AuthService,
    useFactory: (
        userUsecases,
        sessionService,
    ) => new AuthService(
        userUsecases,
        sessionService,
    ),
};

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('auth.jwtSecretKey'),
            }),
        }),
        TypeOrmModule.forFeature([AuthLoginTable]),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        authLoginRepositoryProvider,
        sessionServiceProvider,
        JwtStrategy,
        LocalStrategy,
        AuthServiceProvider,
        EncryptService,
    ],
    exports: [
        ConfigModule,
        JwtModule,
        authLoginRepositoryProvider,
        sessionServiceProvider,
        UserModule,
        EncryptService,
    ],
})
export class AuthModule {}
