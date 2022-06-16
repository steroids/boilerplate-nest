import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {FileImageModel} from '../../domain/models/FileImageModel';

@TableFromModel(FileImageModel, 'file_images')
export class FileImageTable implements DeepPartial<FileImageModel> {}
