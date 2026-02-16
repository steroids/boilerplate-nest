import {
    Controller,
    Get,
    Inject,
    UseGuards,
} from '@nestjs/common';
import {Context} from '@steroidsjs/nest/infrastructure/decorators/Context';
import {ContextDto} from '@steroidsjs/nest/usecases/dtos/ContextDto';
import {FILE_ACCESS_CHECKER, IFileAccessChecker} from '@steroidsjs/nest-file/domain/interfaces/IFileAccessChecker';
import {RequestedFile, RequestedFileInfo} from '@steroidsjs/nest-file/infrastructure/decorators/RequestedFile';
import {FilesAuthGuard} from '@steroidsjs/nest-auth/infrastructure/guards/FilesAuthGuard';

@Controller('/internal/file')
export class InternalFileController {
    constructor(
        @Inject(FILE_ACCESS_CHECKER)
        private readonly accessChecker: IFileAccessChecker,
    ) {}

    @Get('check-access')
    @UseGuards(FilesAuthGuard)
    async checkAccess(
        @Context() context: ContextDto,
        @RequestedFile() fileInfo: RequestedFileInfo,
    ) {
        await this.accessChecker.checkAccess(context, fileInfo);
    }
}
