import {Controller, Get, HttpStatus} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Healthchecks')
@Controller('/health')
export class HealthController {
    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
    })
    async init() {
        return {};
    }
}
