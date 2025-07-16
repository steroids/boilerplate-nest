import {ExtendField} from '@steroidsjs/nest/infrastructure/decorators/fields/ExtendField';
import {UserModel} from 'src/user/domain/models/UserModel';

export class UserSaveDto {
    @ExtendField(UserModel)
    id: number;

    @ExtendField(UserModel)
    phone: string;

    @ExtendField(UserModel)
    email: string;

    @ExtendField(UserModel)
    login: string;

    @ExtendField(UserModel)
    passwordHash: string;

    @ExtendField(UserModel)
    name: string;

    @ExtendField(UserModel)
    authRolesIds: number[];
}
