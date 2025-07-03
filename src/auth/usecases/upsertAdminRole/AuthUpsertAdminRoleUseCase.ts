import {AuthPermissionsService} from '@steroidsjs/nest-auth/domain/services/AuthPermissionsService';
import {Injectable} from '@nestjs/common';
import {AuthRoleService} from '@steroidsjs/nest-auth/domain/services/AuthRoleService';
import {AuthRoleSaveDto} from '@steroidsjs/nest-auth/domain/dtos/AuthRoleSaveDto';
import {DataMapper} from '@steroidsjs/nest/usecases/helpers/DataMapper';
import {AuthRoleEnum} from '../../domain/enums/AuthRoleEnum';

@Injectable()
export class AuthUpsertAdminRoleUseCase {
    constructor(
        private readonly authPermissionsService: AuthPermissionsService,
        private readonly authRoleService: AuthRoleService,
    ) {}

    public async handle() {
        const allPermissions = await this.getAllPermissions();

        const adminRole = await this.authRoleService.createQuery()
            .where({name: AuthRoleEnum.ADMIN})
            .one();

        const roleSaveDto = DataMapper.create(AuthRoleSaveDto, {
            name: AuthRoleEnum.ADMIN,
            title: 'Администратор',
            isActive: true,
            permissionKeys: allPermissions,
        } as AuthRoleSaveDto);

        return this.authRoleService.updateOrCreate(roleSaveDto, adminRole?.id);
    }

    private async getAllPermissions(): Promise<string[]> {
        const tree = await this.authPermissionsService.getPermissionsTree();

        return tree.map(item => this.getFlatPermissions(item)).flat();
    }

    private getFlatPermissions(item: any) {
        return [
            item.id,
            ...(item.items || [])
                .map((someItem: any) => this.getFlatPermissions(someItem))
                .flat(),
        ];
    }
}
