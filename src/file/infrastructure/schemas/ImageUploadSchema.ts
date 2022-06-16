import {instanceToPlain} from 'class-transformer';
import {IImageDownloadObject} from '../../usecases/interfaces/IImageDownloadObject';
import {ImageDownloadSchema} from './ImageDownloadSchema';

export class ImageUploadSchema {
    id: number;

    uid: string;

    title: string;

    fileName: string;

    url: string;

    images: {
        full: {
            id: number,
            url: string,
        }
        thumbnail: {
            id: number,
            url: string,
        }
    }

    static createFromImageModels({fileModel, originalImageModel, thumbnailImageModel}: IImageDownloadObject) {
        const schema = new this();

        Object.assign(schema, instanceToPlain(fileModel));

        schema.url = ImageDownloadSchema.getRelativeUrl(schema.fileName);

        schema.images = {
            full: {
                id: originalImageModel.id,
                url: ImageDownloadSchema.getRelativeUrl(originalImageModel.fileName),
            },
            thumbnail: {
                id: thumbnailImageModel.id,
                url: ImageDownloadSchema.getRelativeUrl(thumbnailImageModel.fileName),
            },
        };

        return schema;
    }
}
