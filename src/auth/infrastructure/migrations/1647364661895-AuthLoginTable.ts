import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthLoginTable1647364661895 implements MigrationInterface {
    name = 'AuthLoginTable1647364661895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ADD "uid" character varying(36)
        `);
        await queryRunner.query(`
            DELETE FROM "auth_logins" WHERE "accessToken" IS NULL or "refreshToken" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "accessToken"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "refreshToken"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "refreshToken" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins"
            ALTER COLUMN "accessToken" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_logins" DROP COLUMN "uid"
        `);
    }
}
