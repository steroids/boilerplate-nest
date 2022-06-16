import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1647226198134 implements MigrationInterface {
    name = 'FileImageTable1647226198134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images"
            ALTER COLUMN "createTime" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images"
            ALTER COLUMN "createTime"
            SET DEFAULT now()
        `);
    }
}
