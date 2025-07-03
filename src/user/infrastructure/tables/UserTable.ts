import {UserModel} from '@steroidsjs/nest-user/domain/models/UserModel';
import {TypeOrmTableFromModel} from '@steroidsjs/nest/infrastructure/decorators/typeorm/TypeOrmTableFromModel';

@TypeOrmTableFromModel(UserModel, 'user')
export class UserTable extends UserModel {}
