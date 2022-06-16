import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTable1648552065217 implements MigrationInterface {
    name = 'UserTable1648552065217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "email" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "email"
        `);
    }
}
