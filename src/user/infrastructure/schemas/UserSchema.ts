import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {UserModel} from '../../domain/models/UserModel';

export class UserSchema {
    @ExtendField(UserModel)
    id: number;

    @ExtendField(UserModel)
    login: string;

    @ExtendField(UserModel)
    email: string;

    @ExtendField(UserModel)
    createTime: string;

    @ExtendField(UserModel)
    updateTime: string;
}
