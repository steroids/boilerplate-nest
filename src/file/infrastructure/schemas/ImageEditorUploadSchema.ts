import {ApiProperty} from '@nestjs/swagger';
import {IImageDownloadObject} from '../../usecases/interfaces/IImageDownloadObject';
import {ImageDownloadSchema} from './ImageDownloadSchema';

export class ImageEditorUploadSchema {
    constructor(uploadedFile: IImageDownloadObject) {
        this.url = ImageDownloadSchema.getRelativeUrl(uploadedFile.fileModel.fileName);
    }

    @ApiProperty({
        type: 'string',
    })
    url: string;
}
