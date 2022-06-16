import {UnauthorizedException} from '@steroidsjs/nest/src/usecases/exceptions';
import {ContextUserDto} from '../dtos/ContextUserDto';
import {UserService} from '../../../user/usecases/services/UserService';
import {ISessionService} from '../interfaces/ISessionService';

export class AuthService {
    constructor(
        private userService: UserService,
        /** @see SessionService **/
        private sessionService: ISessionService,
    ) {
    }

    async login(authUser: ContextUserDto) {
        const user = await this.userService.findById(authUser.id);
        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        return this.sessionService.createAuthLogin(user);
    }
}
