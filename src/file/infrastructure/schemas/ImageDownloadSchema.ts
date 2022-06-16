import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import IManualSchema from '@steroidsjs/nest/src/usecases/interfaces/IManualSchema';
import {ApiProperty} from '@nestjs/swagger';
import {FileModel} from '../../domain/models/FileModel';
import {FileConfig} from '../../usecases/config';
import {FileImageDownloadSchema} from './FileImageDownloadSchema';

export class ImageDownloadSchema implements IManualSchema<FileModel> {
    @ExtendField(FileModel)
    id: number;

    @ExtendField(FileModel)
    uid: string;

    @ExtendField(FileModel)
    fileName: string;

    // Original image data
    @ApiProperty({
        description: 'URL полноразмерного изображения',
    })
    fullUrl: string;

    @ApiProperty({
        description: 'Ширина полноразмерного изображения',
    })
    fullWidth: number;

    @ApiProperty({
        description: 'Высота полноразмерного изображения',
    })
    fullHeight: number;

    // Thumbnail image data

    @ApiProperty({
        description: 'URL превью',
    })
    thumbnailUrl: string;

    @ApiProperty({
        description: 'Ширина превью',
    })
    thumbnailWidth: number;

    @ApiProperty({
        description: 'Высота превью',
    })
    thumbnailHeight: number;

    @ExtendField(FileModel, {relationClass: () => FileImageDownloadSchema})
    images: FileImageDownloadSchema[];

    updateFromModel(file: FileModel) {
        this.id = file.id;
        this.uid = file.uid;
        this.fileName = file.fileName;

        if (!(file.images || []).length) {
            return;
        }

        const thumbImageModel = file.images.find((image) => !image.isOriginal);
        const fullImageModel = file.images.find((image) => image.isOriginal);

        this.fullUrl = ImageDownloadSchema.getRelativeUrl(fullImageModel.fileName);
        this.fullWidth = fullImageModel.width;
        this.fullHeight = fullImageModel.height;

        this.thumbnailUrl = ImageDownloadSchema.getRelativeUrl(thumbImageModel.fileName);
        this.thumbnailWidth = thumbImageModel.width;
        this.thumbnailHeight = thumbImageModel.height;
    }

    static getRelativeUrl(fileName: string): string {
        return FileConfig.relativeUrlPrefix + '/' + fileName;
    }
}
