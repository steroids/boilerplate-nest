import {applyDecorators, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {FileConfig} from '../../usecases/config';

const MAX_BITS_SIZE = 25165824; // 10 mb;

export interface IFileUploadOptions {
    fileFieldName?: string,
}

export function FileUpload(options?: IFileUploadOptions) {
    return applyDecorators(
        UseInterceptors(FileInterceptor(
            options?.fileFieldName ?? 'file',
            {
                storage: diskStorage({
                    destination: FileConfig.uploadedFilesDir,
                    filename: (request, file, callback) => {
                        const randomName = Array(24).fill(null)
                            .map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                        return callback(null, `${randomName}${extname(file.originalname)}`);
                    },
                }),
                limits: {
                    fileSize: MAX_BITS_SIZE,
                },
            },
        )),
    );
}
