import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTable1647226198134 implements MigrationInterface {
    name = 'UserTable1647226198134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "createTime" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "updateTime" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "updateTime"
            SET DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "createTime"
            SET DEFAULT now()
        `);
    }
}
