import {IUserRepository} from '../interfaces/IUserRepository';
import {UserModel} from '../../domain/models/UserModel';

export class UserService {
    constructor(
        public repository: IUserRepository,
    ) {}

    async getUserNames() {
        return this.repository.getAllUsers();
    }

    async findById(id: number) {
        return this.repository.findById(id);
    }

    async findByLogin(login: string): Promise<UserModel> {
        return this.repository.findByLogin(login);
    }
}
