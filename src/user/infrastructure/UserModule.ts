import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {UserTable} from './tables/UserTable';
import {UserService} from '../usecases/services/UserService';
import {AuthModule} from '../../auth/infrastructure/AuthModule';
import {UserRepository} from './repositories/UserRepository';
import {UsersController} from './controllers/UsersController';
import {USER_REPOSITORY_PROVIDER_NAME} from '../usecases/interfaces/IUserRepository';

const userRepositoryProvider = {
    provide: USER_REPOSITORY_PROVIDER_NAME,
    useClass: UserRepository,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable]),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        UsersController,
    ],
    providers: [
        CrudRepository,
        CrudService,
        userRepositoryProvider,
        {
            inject: [USER_REPOSITORY_PROVIDER_NAME],
            provide: UserService,
            useFactory: (
                repository: UserRepository,
            ) => new UserService(repository),
        },
    ],
    exports: [
        UserService,
    ],
})
export class UserModule {}
