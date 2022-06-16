import {ApiProperty} from '@nestjs/swagger';
import {UserSchema} from '../../../user/infrastructure/schemas/UserSchema';

export class AuthInitInputDto {
    @ApiProperty()
    readonly user: UserSchema;
}
