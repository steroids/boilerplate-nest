import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ValidationException} from '@steroidsjs/nest/src/usecases/exceptions/ValidationException';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest<TUser>(err, user): TUser {
        if (err || !user) {
            throw new ValidationException({
                password: 'Неверный логин или пароль',
            });
        }
        return user;
    }
}
