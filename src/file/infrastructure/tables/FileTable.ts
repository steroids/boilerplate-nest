import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {FileModel} from '../../domain/models/FileModel';

@TableFromModel(FileModel, 'files')
export class FileTable implements DeepPartial<FileModel> {}
