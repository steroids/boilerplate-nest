import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTable1645679063157 implements MigrationInterface {
    name = 'UserTable1645679063157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "login"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "email"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "email" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "login" DROP NOT NULL
        `);
    }
}
