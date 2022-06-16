import * as ms from 'ms';
import * as bcrypt from 'bcryptjs';
import {Injectable, Inject} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {BadRequestException} from '@steroidsjs/nest/src/usecases/exceptions';
import {generateUid} from '@steroidsjs/nest/src/infrastructure/decorators/fields/UidField';
import {LoginInputDto} from '../../usecases/dtos/LoginInputDto';
import {UserModel} from '../../../user/domain/models/UserModel';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';
import {UserService} from '../../../user/usecases/services/UserService';
import {
    AUTH_LOGIN_REPOSITORY_PROVIDER_NAME,
    IAuthLoginRepository,
} from '../../usecases/interfaces/IAuthLoginRepository';
import {ISessionService} from '../../usecases/interfaces/ISessionService';
import {ContextUserDto} from '../../usecases/dtos/ContextUserDto';

@Injectable()
export class SessionService implements ISessionService {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(AUTH_LOGIN_REPOSITORY_PROVIDER_NAME)
        /** @see AuthLoginRepository **/
        private readonly authLoginAdminRepository: IAuthLoginRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(loginDto: LoginInputDto) {
        const user = await this.userService.findByLogin(loginDto.login);
        if (user) {
            const passwordEquals = await bcrypt.compare(loginDto.password, user.passwordHash);
            if (passwordEquals) {
                return user;
            }
        }
        throw new BadRequestException({
            errors: {
                password: 'Некорректный логин или пароль',
            },
        });
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 5);
    }

    generateTokenPayload = (user: UserModel): ContextUserDto => ({
        id: user.id,
        role: user.role,
    });

    async isLoginValid(uid: string): Promise<boolean> {
        const loginModel = await this.findLoginByUid(uid);
        return loginModel && !loginModel.isRevoked;
    }

    async findLoginByUid(uid: string) {
        return this.authLoginAdminRepository.findOne({uid});
    }

    // @todo move to AuthLoginService
    async createAuthLogin(user: UserModel): Promise<AuthLoginModel> {
        // Create login model
        const loginModel = new AuthLoginModel();
        loginModel.user = user;
        loginModel.uid = generateUid();

        const tokenPayload = this.generateTokenPayload(user);

        // Generate and set access token & expire time
        const {token: accessToken, expires: accessExpireTime} = this.generateToken(loginModel.uid, tokenPayload);
        loginModel.accessExpireTime = accessExpireTime;
        loginModel.accessToken = accessToken;

        // Generate and set refresh token & expire time
        const {token: refreshToken, expires: refreshExpireTime} = this.generateToken(loginModel.uid, tokenPayload);
        loginModel.refreshExpireTime = refreshExpireTime;
        loginModel.refreshToken = refreshToken;

        // Save tokens in AuthLogin model
        await this.authLoginAdminRepository.create(loginModel);

        return loginModel;
    }

    private generateToken(
        authLoginUid: string,
        tokenPayload: {id: number, role: string},
    ): {token: string, expires: Date} {
        const tokenExpiresMs = ms(this.configService.get('auth.accessTokenExpiresSec') || '5m');
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + tokenExpiresMs);

        const token = this.jwtService.sign(tokenPayload, {
            issuer: this.configService.get('name'),
            subject: String(tokenPayload.id),
            jwtid: String(authLoginUid),
            expiresIn: expiration.getTime(),
        });

        return {
            token,
            expires: expiration,
        };
    }
}
