import {Controller, Post, Put, UploadedFile} from '@nestjs/common';
import {FileUpload} from '../decorators/FileUpload';
import {IFile} from '../../usecases/interfaces/IFile';
import {ImageUploadSchema} from '../schemas/ImageUploadSchema';
import {FileService} from '../../usecases/services/FileService';
import {ImageEditorUploadSchema} from '../schemas/ImageEditorUploadSchema';

@Controller('/file')
export default class FileController {
    constructor(
        private readonly fileService: FileService,
    ) {
    }

    @Put('/upload-photo')
    @FileUpload()
    async photos(@UploadedFile() file: IFile): Promise<ImageUploadSchema> {
        return ImageUploadSchema.createFromImageModels(await this.fileService.uploadImage(file));
    }

    @Post('/upload-photo-editor')
    @FileUpload({
        fileFieldName: 'upload',
    })
    async photosEditor(@UploadedFile() file: IFile): Promise<ImageEditorUploadSchema> {
        const uploadedFile = await this.fileService.uploadImage(file);
        return new ImageEditorUploadSchema(uploadedFile);
    }
}
