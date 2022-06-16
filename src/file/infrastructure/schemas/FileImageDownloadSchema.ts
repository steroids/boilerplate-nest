import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {FileImageModel} from '../../domain/models/FileImageModel';

export class FileImageDownloadSchema {
    @ExtendField(FileImageModel)
    id: number;

    @ExtendField(FileImageModel)
    fileId: number;

    @ExtendField(FileImageModel)
    fileName: string;

    @ExtendField(FileImageModel)
    fileSize: number;

    @ExtendField(FileImageModel)
    fileMimeType: string;

    @ExtendField(FileImageModel)
    folder: string;

    @ExtendField(FileImageModel)
    width: number;

    @ExtendField(FileImageModel)
    height: number;

    @ExtendField(FileImageModel)
    isOriginal: boolean;

    @ExtendField(FileImageModel)
    createTime: Date;
}
