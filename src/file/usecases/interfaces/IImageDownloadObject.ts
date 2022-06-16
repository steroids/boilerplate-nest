import {FileModel} from '../../domain/models/FileModel';
import {FileImageModel} from '../../domain/models/FileImageModel';

export interface IImageDownloadObject {
    fileModel: FileModel,
    originalImageModel: FileImageModel,
    thumbnailImageModel: FileImageModel,
}
