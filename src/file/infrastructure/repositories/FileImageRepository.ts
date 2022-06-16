import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {IFileImageRepository} from '../../usecases/interfaces/IFileImageRepository';
import {FileImageModel} from '../../domain/models/FileImageModel';
import {FileImageTable} from '../tables/FileImageTable';

export class FileImageRepository extends CrudRepository<FileImageModel> implements IFileImageRepository {
    protected modelClass = FileImageModel;

    constructor(
        @InjectRepository(FileImageTable)
        public dbRepository: Repository<FileImageTable>,
    ) {
        super();
    }
}
