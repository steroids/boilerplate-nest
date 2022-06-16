import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {FileImageModel} from '../../domain/models/FileImageModel';

export const FILE_IMAGE_REPOSITORY_PROVIDER_NAME = 'FileImageRepository';

export type IFileImageRepository = ICrudRepository<FileImageModel>
