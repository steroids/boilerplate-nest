import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {UserModel} from '../../domain/models/UserModel';

@TableFromModel(UserModel, 'user_users')
export class UserTable implements DeepPartial<UserModel> {}
