import {SearchInputDto} from '@steroidsjs/nest/usecases/dtos/SearchInputDto';
import {StringField} from '@steroidsjs/nest/infrastructure/decorators/fields';

export class UserSearchDto extends SearchInputDto {
    @StringField({
        nullable: true,
    })
    login: string;

    @StringField({
        label: 'Поисковый запрос',
        nullable: true,
    })
    query?: string;
}
