import {Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {Context} from '@steroidsjs/nest/src/infrastructure/decorators/Context';
import {ContextDto} from '@steroidsjs/nest/src/usecases/dtos/ContextDto';
import {AuthService} from '../../usecases/services/AuthService';
import {LoginInputDto} from '../../usecases/dtos/LoginInputDto';
import {LocalAuthGuard} from '../guards/LocalAuthGuard';

@ApiTags('Авторизация')
@Controller('/auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ) {}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({type: LoginInputDto})
    login(@Context() context: ContextDto) {
        return this.authService.login(context.user);
    }
}
