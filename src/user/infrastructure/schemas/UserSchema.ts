import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields/ExtendField';
import {UserModel} from '../../domain/models/UserModel';

export class UserSchema {
    @ExtendField(UserModel)
    id: number;

    @ExtendField(UserModel)
    name: string;
}
