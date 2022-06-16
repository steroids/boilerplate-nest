import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {FileModel} from '../../domain/models/FileModel';

export const FILE_REPOSITORY_PROVIDER_NAME = 'FileRepository';

export type IFileRepository = ICrudRepository<FileModel>
