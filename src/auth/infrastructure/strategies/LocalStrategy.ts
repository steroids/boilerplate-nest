import {BadRequestException, Injectable, Inject} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {UserService} from '../../../user/usecases/services/UserService';
import {SESSION_SERVICE_PROVIDER, ISessionService} from '../../usecases/interfaces/ISessionService';
import {ContextUserDto} from '../../usecases/dtos/ContextUserDto';
import {EncryptService} from '../../usecases/services/EncryptService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        /** @see SessionService **/
        @Inject(SESSION_SERVICE_PROVIDER) private readonly sessionService: ISessionService,
        private readonly encryptService: EncryptService,
    ) {
        super({
            usernameField: 'login',
            passwordField: 'password',
        });
    }

    async validate(login: string, password: string): Promise<ContextUserDto> {
        const user = await this.userService.findByLogin(login);
        if (user) {
            const arePasswordsEquals = this.encryptService.comparePasswords(password, user.passwordHash);
            if (arePasswordsEquals) {
                return this.sessionService.generateTokenPayload(user);
            }
        }

        throw new BadRequestException({
            errors: {
                password: 'Некорректный логин или пароль',
            },
        });
    }
}
