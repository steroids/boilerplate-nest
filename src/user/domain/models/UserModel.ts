import {
    RelationField,
    StringField,
    PasswordField,
    CreateTimeField,
    UpdateTimeField,
    RelationIdField, PrimaryKeyField,
} from '@steroidsjs/nest/infrastructure/decorators/fields';
import {AuthRoleModel} from '@steroidsjs/nest-auth/domain/models/AuthRoleModel';

/**
 * Пользователь системы
 */
export class UserModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        nullable: true,
    })
    phone: string;

    @StringField({
        nullable: true,
    })
    email: string;

    @StringField({
        nullable: true,
    })
    login: string;

    @PasswordField({
        label: 'Хеш пароля',
        nullable: true,
    })
    passwordHash: string;

    @StringField({
        label: 'Имя',
        nullable: true,
    })
    name: string;

    @RelationField({
        label: '',
        type: 'ManyToMany',
        isOwningSide: false,
        relationClass: () => AuthRoleModel,
        inverseSide: (role: AuthRoleModel) => role.users,
    })
    authRoles: AuthRoleModel[];

    @RelationIdField({
        nullable: true,
        relationName: 'authRoles',
        isArray: true,
    })
    authRolesIds: number[];

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
