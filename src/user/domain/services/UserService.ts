import {CrudService} from '@steroidsjs/nest/usecases/services/CrudService';
import {UserModel} from 'src/user/domain/models/UserModel';
import {UserSaveDto} from '@steroidsjs/nest-user/domain/dtos/UserSaveDto';
import {IUserService} from '@steroidsjs/nest-modules/user/services/IUserService';
import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'src/user/domain/interfaces/IUserRepository';
import {normalizePhone} from '@steroidsjs/nest/infrastructure/decorators/fields/PhoneField';
import {ICondition} from '@steroidsjs/nest/infrastructure/helpers/typeORM/ConditionHelperTypeORM';
import {UserSearchDto} from 'src/user/domain/dtos/user/UserSearchDto';
import {ContextDto} from '@steroidsjs/nest/usecases/dtos/ContextDto';

@Injectable()
export class UserService extends CrudService<UserModel,
    UserSearchDto,
    UserSaveDto> implements IUserService {
    protected modelClass = UserModel;

    constructor(
        /** UserRepository */
        @Inject(IUserRepository)
        public repository: IUserRepository,
    ) {
        super();
    }

    async findByLogin(login: string): Promise<UserModel> {
        const phone = normalizePhone(login);
        const user = await this.repository.findOne([
            'or',
            {email: login},
            {login},
            !!phone && {phone},
        ].filter(Boolean) as ICondition[]);

        return user || null as any;
    }
}
