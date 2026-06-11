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
import {tables} from './tables';
import {controllers} from './controllers';

@Module({
    ...coreModule,
    tables,
    module: (config) => {
        const baseModule = coreModule.module ? coreModule.module(config) : {};

        const baseProviders = baseModule.providers ?? [];
        const baseExports = baseModule.exports ?? [];

        return {
            ...baseModule,
            controllers,
            imports: [forwardRef(() => AuthModule)],
            providers: [
                ...baseProviders,
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
                    useFactory: (userService: IUserService, sessionService: ISessionService) =>
                        new UserUpdatePasswordUseCase(userService, sessionService),
                },

                ...userUseCases,
            ],
            exports: [
                ...baseExports,
                IUserService,
                IUserRepository,
                IUserUpdatePasswordUseCase,
            ],
        };
    },
})
export class UserModule {}
