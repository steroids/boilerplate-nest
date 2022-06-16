import {applyDecorators, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {JwtAuthGuard} from '../guards/JwtAuthGuard';

export function Auth() {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
