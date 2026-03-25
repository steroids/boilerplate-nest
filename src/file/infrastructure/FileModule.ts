import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-file';
import {IFileModuleConfig} from '@steroidsjs/nest-file/infrastructure/config';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';
import {InternalFileController} from './controllers/InternalFileController';

@Module({
    ...coreModule,
    tables: [
        ...(coreModule.tables ?? []),
        ...ModuleHelper.importDir(__dirname + '/tables'),
    ],
    module: (config: IFileModuleConfig) => {
        if (!coreModule.module) {
            throw new Error('coreModule.module is not defined');
        }
        const module = coreModule.module(config);
        return {
            ...module,
            providers: [
                ...(module.providers ?? []),
            ],
            controllers: [
                ...(module.controllers ?? []),
                InternalFileController,
            ],
            exports: [
                ...(module.exports ?? []),
            ],
        };
    },
})
export class FileModule {}
