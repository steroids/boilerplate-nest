import {join} from 'path';
import {IFileImageRepository} from '../interfaces/IFileImageRepository';
import {IFile} from '../interfaces/IFile';
import {FileImageModel} from '../../domain/models/FileImageModel';
import {FileConfig} from '../config';

interface ISharpResizedData {
    format: string,
    width: number,
    height: number,
    channels: number,
    premultiplied: boolean,
    size: number,
}

interface ISharpResizeData {
    format: string,
    width: number,
    height: number,
}

const sharp = require('sharp');

export const imagesMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
];

export class FileImageService {
    constructor(
        public repository: IFileImageRepository,
    ) {
    }

    async saveImages(originalFile: IFile, fileId: number): Promise<{
        originalImageModel: FileImageModel,
        thumbnailImageModel: FileImageModel,
    }> {
        const originalImageModel = await this.saveOriginalImage(originalFile, fileId);
        const thumbnailImageModel = await this.saveThumbnailImage(originalFile, fileId);
        return {
            originalImageModel,
            thumbnailImageModel,
        };
    }

    async getSavedImages(id: number): Promise<FileImageModel[]> {
        return this.repository.findMany({fileId: id});
    }

    async saveOriginalImage(originalFile: IFile, fileId: number): Promise<FileImageModel> {
        const originalImageMetadata: ISharpResizeData = await sharp(originalFile.path).metadata();
        return this.repository.create(this.rawFileToModel({
            ...originalFile,
            width: originalImageMetadata.width,
            height: originalImageMetadata.height,
        },
        fileId,
        true));
    }

    async saveThumbnailImage(originalFile: IFile, fileId: number): Promise<FileImageModel> {
        const thumbnailName = this.getThumbnailName(originalFile.filename);
        const thumbnailPath = join(FileConfig.uploadedFilesDir, thumbnailName);

        const thumbnailImageMetadata: ISharpResizedData = await sharp(originalFile.path)
            .resize({
                width: FileConfig.thumbnail.width,
                height: FileConfig.thumbnail.height,
            })
            .toFile(thumbnailPath);

        return this.repository.create(this.rawFileToModel({
            ...thumbnailImageMetadata,
            filename: thumbnailName,
            mimetype: originalFile.mimetype,
            width: thumbnailImageMetadata.width,
            height: thumbnailImageMetadata.height,
        },
        fileId));
    }

    rawFileToModel(
        fileData: {
            filename: string,
            size: number,
            mimetype: string,
            width: number,
            height: number,
        },
        fileId: number,
        isOriginal = false,
    ): FileImageModel {
        const model = new FileImageModel();

        model.fileId = fileId;
        model.fileName = fileData.filename;
        model.fileSize = fileData.size;
        model.fileMimeType = fileData.mimetype;
        model.folder = FileConfig.uploadedFilesDir;
        model.width = fileData.width;
        model.height = fileData.height;
        model.isOriginal = isOriginal;

        return model;
    }

    getThumbnailName(fileNameWithExtension: string): string {
        const fileName = fileNameWithExtension.split('.')[0];
        const fileExtension = fileNameWithExtension.split('.')[1];
        return fileName + FileConfig.thumbnail.prefix + fileExtension;
    }
}
