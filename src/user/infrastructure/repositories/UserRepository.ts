import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserTable} from '../tables/UserTable';
import {IUserRepository} from '../../usecases/interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserTable)
        public dbRepository: Repository<UserTable>,
    ) {}

    async getAllUsers() {
        return this.dbRepository.find();
    }

    async findById(id: number) {
        return this.dbRepository.findOne(id);
    }

    async findByLogin(login: string) {
        return this.dbRepository.findOne({login});
    }
}
