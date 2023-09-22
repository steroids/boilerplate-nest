import {Module} from '@nestjs/common';
import {InitController} from './controllers/InitController';
import {UserModule} from '../../user/infrastructure/UserModule';

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        InitController,
    ],
})
export class InitModule {}
