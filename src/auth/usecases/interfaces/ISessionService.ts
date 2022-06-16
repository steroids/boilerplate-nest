import {UserModel} from '../../../user/domain/models/UserModel';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';
import {ContextUserDto} from '../dtos/ContextUserDto';

export const SESSION_SERVICE_PROVIDER = 'session_service_provider';

export interface ISessionService {
    createAuthLogin: (user: UserModel) => Promise<AuthLoginModel>,
    hashPassword: (password: string) => Promise<string>,
    generateTokenPayload: (user: UserModel) => ContextUserDto
}
