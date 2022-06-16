import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {AuthLoginTable} from '../tables/AuthLoginTable';
import {AuthLoginModel} from '../../domain/models/AuthLoginModel';

@Injectable()
export class AuthLoginRepository extends CrudRepository<AuthLoginModel> {
    constructor(
        @InjectRepository(AuthLoginTable)
        public dbRepository: Repository<AuthLoginTable>,
    ) {
        super();
    }

    protected modelClass = AuthLoginModel;
}
