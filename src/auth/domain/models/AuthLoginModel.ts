import {
    PrimaryKeyField,
    RelationField,
    StringField,
    CreateTimeField,
    UpdateTimeField, UidField, BooleanField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import { UserModel } from '../../../user/domain/models/UserModel';

/**
 * Авторизации пользователя с токенами
 */
export class AuthLoginModel {
    @PrimaryKeyField()
    id: number;

    @UidField()
    uid: string;

    @RelationField({
        label: 'ID пользователя',
        type: 'ManyToOne',
        relationClass: () => UserModel,
    })
    user: UserModel;

    @StringField({
        label: 'Токен доступа',
    })
    accessToken: string;

    @StringField({
        label: 'Время истечения токена',
    })
    accessExpireTime: Date;

    @StringField({
        label: 'Токен для обновления',
    })
    refreshToken: string;

    @StringField({
        label: 'Время истечения токена обновления',
    })
    refreshExpireTime: Date;

    @StringField({
        label: 'IP адрес',
        nullable: true,
    })
    ipAddress: string;

    @StringField({
        label: 'Месторасположение',
        nullable: true,
    })
    location: string;

    @StringField({
        label: 'User-agent',
        nullable: true,
    })
    userAgent: string;

    @BooleanField({
        label: 'Отозван?',
    })
    isRevoked: boolean;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: Date;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: Date;
}
