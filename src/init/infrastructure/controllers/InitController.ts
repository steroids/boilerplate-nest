import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ContextDto} from '@steroidsjs/nest/src/usecases/dtos/ContextDto';
import {Context} from '@steroidsjs/nest/src/infrastructure/decorators/Context';
import {AuthenticateUser} from '../../../auth/infrastructure/guards/AuthenticateUser';
import {AuthInitInputDto} from '../../usecases/dtos/AuthInitInputDto';
import {UserService} from '../../../user/usecases/services/UserService';
import getExportedEnums from '../helpers/getExportedEnums';
import getExportedModels from '../helpers/getExportedModels';
import {InitRequestDto} from '../../usecases/dtos/InitRequestDto';
import {exportEnums, exportModels} from '../helpers/entitiesExporter';

@ApiTags('Авторизация')
@Controller('/init')
export class InitController {
    constructor(
        private userService: UserService,
    ) {}

    @Post()
    @UseGuards(AuthenticateUser)
    @ApiOkResponse({type: AuthInitInputDto})
    async init(
        @Context() context: ContextDto,
        @Body() dto: InitRequestDto,
    ) {
        const user = context.user?.id ? await this.userService.findById(context.user.id) : null;

        const exportedEnums = exportEnums(getExportedEnums());
        const exportedModels = exportModels(getExportedModels());

        return {
            user,
            meta: {
                ...exportedEnums,
                ...exportedModels,
            },
        };
    }
}
