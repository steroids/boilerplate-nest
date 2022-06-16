export const USER_REPOSITORY_PROVIDER_NAME = 'UserRepository';

export interface IUserRepository {
    getAllUsers(): Promise<any>,
    findById(id: number): any,
    findByLogin(login: string): any,
}
