import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {DeepPartial} from 'typeorm';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';

@TableFromModel(AuthLoginModel, {name: 'auth_logins'})
export class AuthLoginTable implements DeepPartial<AuthLoginModel> {}
