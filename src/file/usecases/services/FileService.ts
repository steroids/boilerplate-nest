import {IFileRepository} from '../interfaces/IFileRepository';
import {FileModel} from '../../domain/models/FileModel';
import {FileImageService} from './FileImageService';
import {IFile} from '../interfaces/IFile';
import {FileConfig} from '../config';
import {IImageDownloadObject} from '../interfaces/IImageDownloadObject';

export class FileService {
    constructor(
        public repository: IFileRepository,
        private readonly fileImageService: FileImageService,
    ) {
    }

    async uploadImage(file: IFile): Promise<IImageDownloadObject> {
        const fileModel = await this.repository.create(this.rawFileToModel(file));
        const {originalImageModel, thumbnailImageModel} = await this.fileImageService.saveImages(file, fileModel.id);
        return {
            fileModel,
            originalImageModel,
            thumbnailImageModel,
        };
    }

    async getImageDownloadData(id: number): Promise<IImageDownloadObject> {
        const fileModel = await this.repository.findOne({id});
        const images = await this.fileImageService.getSavedImages(id);
        const originalImageModel = images.find(image => image.isOriginal);
        const thumbnailImageModel = images.find(image => !image.isOriginal);

        return {
            fileModel,
            originalImageModel,
            thumbnailImageModel,
        };
    }

    rawFileToModel(file: IFile): FileModel {
        const model = new FileModel();

        model.title = file.originalname;
        model.fileName = file.filename;
        model.fileSize = file.size;
        model.fileMimeType = file.mimetype;
        model.folder = FileConfig.uploadedFilesDir;

        return model;
    }
}
