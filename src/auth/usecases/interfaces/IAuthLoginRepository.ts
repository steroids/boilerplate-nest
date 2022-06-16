import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';

export const AUTH_LOGIN_REPOSITORY_PROVIDER_NAME = 'AuthLoginRepository';

export type IAuthLoginRepository = ICrudRepository<AuthLoginModel>
