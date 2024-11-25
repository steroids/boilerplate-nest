import {TableFromModel} from '@steroidsjs/nest/infrastructure/decorators/TableFromModel';
import {UserModel} from '@steroidsjs/nest-user/domain/models/UserModel';

@TableFromModel(UserModel, 'user')
export class UserTable extends UserModel {}
