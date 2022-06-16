import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UserService} from '../../usecases/services/UserService';
import {Auth} from '../../../auth/infrastructure/decorators/Auth';

@ApiTags('Demo users controller')
@Controller('/users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    @Auth()
    getUserNames() {
        return this.userService.getUserNames();
    }
}
