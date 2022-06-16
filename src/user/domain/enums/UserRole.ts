import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export class UserRole extends BaseEnum {
    static ADMIN = 'admin';

    static USER = 'user';

    static getTitle() {
        return 'Роли пользователей';
    }

    static getLabels() {
        return {
            admin: 'Администратор',
            user: 'Пользователь',
        };
    }
}
