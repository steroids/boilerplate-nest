import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {IFileRepository} from '../../usecases/interfaces/IFileRepository';
import {FileTable} from '../tables/FileTable';
import {FileModel} from '../../domain/models/FileModel';

@Injectable()
export class FileRepository extends CrudRepository<FileModel> implements IFileRepository {
    protected modelClass = FileModel;

    constructor(
        @InjectRepository(FileTable)
        public dbRepository: Repository<FileTable>,
    ) {
        super();
    }
}
