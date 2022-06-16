import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileTable1647226198134 implements MigrationInterface {
    name = 'FileTable1647226198134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "files"
            ALTER COLUMN "createTime" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "files"
            ALTER COLUMN "createTime"
            SET DEFAULT now()
        `);
    }
}
