import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-file';
import {IFileModuleConfig} from '@steroidsjs/nest-file/infrastructure/config';
import {ModuleHelper} from '@steroidsjs/nest/infrastructure/helpers/ModuleHelper';

@Module({
    ...coreModule,
    tables: [
        ...(coreModule.tables ?? []),
        ...ModuleHelper.importDir(__dirname + '/tables'),
    ],
    config: () => {
        const config = (coreModule?.config ?? (() => {}))();

        return {
            ...config,
            previews: {
                original: {
                    ...(config?.previews?.original ?? {}),
                    sharp: {
                        ...(config?.previews?.original?.sharp ?? {}),
                        rotate: true,
                    },
                },
                thumbnail: {
                    ...(config?.previews?.thumbnail ?? {}),
                    sharp: {
                        ...(config?.previews?.thumbnail?.sharp ?? {}),
                        rotate: true,
                    },
                },
            },
        } as IFileModuleConfig;
    },
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
            ],
            exports: [
                ...(module.exports ?? []),
            ],
        };
    },
})
export class FileModule {}
