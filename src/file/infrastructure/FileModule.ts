import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FileTable} from './tables/FileTable';
import {FileService} from '../usecases/services/FileService';
import {FILE_REPOSITORY_PROVIDER_NAME} from '../usecases/interfaces/IFileRepository';
import {FileRepository} from './repositories/FileRepository';
import {FILE_IMAGE_REPOSITORY_PROVIDER_NAME} from '../usecases/interfaces/IFileImageRepository';
import {FileImageRepository} from './repositories/FileImageRepository';
import {FileImageService} from '../usecases/services/FileImageService';
import {FileImageTable} from './tables/FileImageTable';
import FileController from './controllers/FileController';

const fileRepositoryProvider = {
    provide: FILE_REPOSITORY_PROVIDER_NAME,
    useClass: FileRepository,
};

const fileImageRepositoryProvider = {
    provide: FILE_IMAGE_REPOSITORY_PROVIDER_NAME,
    useClass: FileImageRepository,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FileTable,
            FileImageTable,
        ]),
    ],
    providers: [
        fileRepositoryProvider,
        {
            inject: [FILE_REPOSITORY_PROVIDER_NAME, FileImageService],
            provide: FileService,
            useFactory: (
                repository: FileRepository,
                fileImageService: FileImageService,
            ) => new FileService(repository, fileImageService),
        },
        fileImageRepositoryProvider,
        {
            inject: [FILE_IMAGE_REPOSITORY_PROVIDER_NAME],
            provide: FileImageService,
            useFactory: (
                repository: FileImageRepository,
            ) => new FileImageService(repository),
        },
    ],
    controllers: [
        FileController,
    ],
    exports: [
        FileService,
        fileImageRepositoryProvider,
    ],
})
export class FileModule {}
