import {
    CreateTimeField, EmailField,
    PasswordField,
    PrimaryKeyField,
    StringField, UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserRole} from '../enums/UserRole';

export class UserModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Роль',
        defaultValue: UserRole.ADMIN,
    })
    role: string;

    @StringField({
        label: 'Логин',
    })
    login: string;

    @PasswordField({
        label: 'Хэш пароля',
        nullable: true,
    })
    passwordHash: string;

    @EmailField({
        nullable: true,
    })
    email: string;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: Date;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: Date;
}
