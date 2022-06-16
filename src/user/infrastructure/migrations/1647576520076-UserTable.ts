import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserTable1647576520076 implements MigrationInterface {
    name = 'UserTable1647576520076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "isBanned"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "isUnSubscribed"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "firstName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "phone"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users" DROP COLUMN "language"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "role"
            SET DEFAULT 'admin'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ALTER COLUMN "role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "language" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "phone" character varying(16)
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "firstName" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "lastName" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "isUnSubscribed" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "user_users"
            ADD "isBanned" boolean NOT NULL DEFAULT false
        `);
    }
}
