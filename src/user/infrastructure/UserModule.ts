import {join} from 'path';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import coreModule from '@steroidsjs/nest-user';
import {ISessionService} from '@steroidsjs/nest-auth/domain/interfaces/ISessionService';
import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import {AuthModule} from '@steroidsjs/nest-modules/auth/AuthModule';
import {forwardRef} from '@nestjs/common';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {IUserUpdatePasswordUseCase} from '@steroidsjs/nest-modules/user/usecases/IUserUpdatePasswordUseCase';
import {UserUpdatePasswordUseCase} from '@steroidsjs/nest-user/usecases/userUpdatePassword/UserUpdatePasswordUseCase';
import {userUseCases} from '../usecases';
import {UserService} from '../domain/services/UserService';
import {IUserRepository} from '../domain/interfaces/IUserRepository';
import {UserCliCommandService} from './UserCliCommandService';
import {UserRepository} from './repositories/UserRepository';

@Module({
    ...coreModule,
    tables: ModuleHelper.importDir(join(__dirname, '/tables')),
    module: (config) => {
        const module = coreModule.module(config) as any;
        return {
            ...module,
            controllers: ModuleHelper.importDir(__dirname + '/controllers'),
            imports: [
                forwardRef(() => AuthModule),
            ],
            providers: [
                ...module.providers,
                UserCliCommandService,

                {
                    provide: IUserRepository,
                    useClass: UserRepository,
                },
                {
                    provide: IUserService,
                    useClass: UserService,
                },
                {
                    provide: IUserUpdatePasswordUseCase,
                    inject: [IUserService, ISessionService],
                    useFactory: (userService: IUserService, sessionService: ISessionService) => (
                        new UserUpdatePasswordUseCase(userService, sessionService)
                    ),
                },

                ...userUseCases,
            ],
            exports: [
                ...module.exports,
                IUserService,
                IUserRepository,
                IUserUpdatePasswordUseCase,
            ],
        };
    },
})
export class UserModule {
}
