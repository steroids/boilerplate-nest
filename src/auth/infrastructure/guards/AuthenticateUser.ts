import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';
import {JsonWebTokenError} from 'jsonwebtoken';

/**
 * Проверяем пользователя по токену, и если токен корректный, то добавляем пользователя в реквест
 * @todo неправильно использовать для этого guard, но в обычном декораторе непонятно как получить jwtService
 */
@Injectable()
export class AuthenticateUser implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization || '';
        const [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() === 'bearer' && token) {
            try {
                req.user = this.jwtService.verify(token) || null;
            } catch (error) {
                // If there's an error in verifying token, then we can't get context user
                if (error instanceof JsonWebTokenError) {
                    req.user = null;
                } else {
                    throw error;
                }
            }
        }
        return true;
    }
}
