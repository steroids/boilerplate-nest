import {Module} from '@steroidsjs/nest/infrastructure/decorators/Module';
import coreModule from '@steroidsjs/nest-notifier';
import {INotifierService} from '@steroidsjs/nest-modules/notifier/services/INotifierService';
import {INotifierModuleConfig} from '@steroidsjs/nest-notifier/infrastructure/config';
import {NotifierService} from '@steroidsjs/nest-notifier/domain/services/NotifierService';
import {NotifierSendRequestService} from '@steroidsjs/nest-notifier/domain/services/NotifierSendRequestService';
import {INotifierProviderService} from '@steroidsjs/nest-notifier/domain/interfaces/INotifierProviderService';

@Module({
    ...coreModule,
    module: (config: INotifierModuleConfig) => {
        if (!coreModule.module) {
            throw new Error('coreModule.module is not defined');
        }
        const module = coreModule.module(config);

        return {
            imports: [],
            providers: [
                ...(module.providers ?? []),
                {
                    provide: INotifierService,
                    inject: [INotifierProviderService, NotifierSendRequestService],
                    useFactory: (
                        notifierProviderService: INotifierProviderService,
                        notifierSendRequestService: NotifierSendRequestService,
                    ) => new NotifierService(notifierProviderService, notifierSendRequestService, []),
                },
            ],
            exports: [
                INotifierService,
            ],
        };
    },
})
export class NotifierModule { }
