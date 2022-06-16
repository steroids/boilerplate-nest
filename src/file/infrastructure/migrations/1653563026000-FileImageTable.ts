import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1653563026000 implements MigrationInterface {
    name = 'FileImageTable1653563026000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create index file_images_fileid_index on file_images ("fileId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop index file_images_fileid_index;
        `);
    }
}
