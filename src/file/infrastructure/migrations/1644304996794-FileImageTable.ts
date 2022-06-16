import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1644304996794 implements MigrationInterface {
    name = 'FileImageTable1644304996794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images"
            ADD "isOriginal" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images" DROP COLUMN "isOriginal"
        `);
    }
}
