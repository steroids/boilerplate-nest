import * as readline from 'readline/promises';
import {Command, Positional} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {UserCreateAdminUseCase} from 'src/user/usecases/userCreateAdmin/UserCreateAdminUseCase';

@Injectable()
export class UserCliCommandService {
    constructor(
        private readonly userCreateAdminUseCase: UserCreateAdminUseCase,
    ) {}

    @Command({
        command: 'user:create-admin <login>',
        describe: 'Create admin user',
    })
    async import(
        @Positional({
            name: 'login',
            describe: 'User login',
            type: 'string',
        })
        login: string,
    ) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const password = await rl.question('Введите пароль: ');
        rl.close();

        const user = await this.userCreateAdminUseCase.handle(login, password);
        // eslint-disable-next-line no-console
        console.log('Пользователь создан: ');
        // eslint-disable-next-line no-console
        console.log(user);
    }
}
