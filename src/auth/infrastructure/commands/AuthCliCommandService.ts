import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {AuthUpsertAdminRoleUseCase} from 'src/auth/usecases/upsertAdminRole/AuthUpsertAdminRoleUseCase';

@Injectable()
export class AuthCliCommandService {
    constructor(
        private readonly authUpsertAdminRoleUseCase: AuthUpsertAdminRoleUseCase,
    ) {}

    @Command({
        command: 'auth:upsert-admin',
        describe: 'Upsert admin role',
    })
    async import() {
        const role = await this.authUpsertAdminRoleUseCase.handle();

        // eslint-disable-next-line no-console
        console.log('Роль сохранена! ', role);
    }
}
