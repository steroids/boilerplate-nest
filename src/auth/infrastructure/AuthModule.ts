import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-auth';
import {IAuthModuleConfig} from '@steroidsjs/nest-auth/infrastructure/config';
import {AuthController as BaseAuthController} from '@steroidsjs/nest-auth/infrastructure/controllers/AuthController';
import {authUseCases} from '../usecases';
import {AuthCliCommandService} from './commands/AuthCliCommandService';
import {tables} from './tables';

@Module({
    ...coreModule,
    tables: [
        ...(coreModule.tables ?? []),
        ...tables,
    ],
    module: (config: IAuthModuleConfig) => {
        if (!coreModule.module) {
            throw new Error('coreModule.module is not defined');
        }
        const module = coreModule.module(config);
        return {
            ...module,
            imports: [
                ...(module.imports ?? []),
            ],
            controllers: [
                ...(module.controllers ?? []).filter(controller => controller !== BaseAuthController),
            ],
            providers: [
                AuthCliCommandService,

                ...(module.providers ?? []),

                ...authUseCases,
            ],
        };
    },
})
export class AuthModule {}
