import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {ISessionService} from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {Inject, Injectable} from '@nestjs/common';
import {AuthRoleService} from '@steroidsjs/nest-auth/domain/services/AuthRoleService';
import {AuthRoleEnum} from 'src/auth/domain/enums/AuthRoleEnum';
import {UserModel} from 'src/user/domain/models/UserModel';
import {UserSaveDto} from '../../domain/dtos/user/UserSaveDto';

@Injectable()
export class UserCreateAdminUseCase {
    constructor(
        @Inject(IUserService)
        private readonly userService: IUserService,
        @Inject(ISessionService)
        private readonly sessionService: ISessionService,
        @Inject(AuthRoleService)
        private readonly authRoleService: AuthRoleService,
    ) {}

    public async handle(login: string, password: string) {
        const adminRole = await this.authRoleService.createQuery()
            .where({
                name: AuthRoleEnum.ADMIN,
            })
            .one();

        if (!adminRole) {
            throw new Error('Роль администратора не найдена');
        }

        const userSaveDto = DataMapper.create(UserSaveDto, {
            login,
            name: 'Администратор',
            passwordHash: await this.sessionService.hashPassword(password),
            authRolesIds: [adminRole.id],
        });

        return this.userService.create(userSaveDto);
    }
}
