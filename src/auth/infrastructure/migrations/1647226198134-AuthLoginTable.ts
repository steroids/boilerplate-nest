import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthLoginTable1647226198134 implements MigrationInterface {
    name = 'AuthLoginTable1647226198134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "createTime" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "updateTime" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "updateTime"
            SET DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "createTime"
            SET DEFAULT now()
        `);
    }
}
