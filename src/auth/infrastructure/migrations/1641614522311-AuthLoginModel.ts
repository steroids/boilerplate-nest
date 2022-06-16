import {MigrationInterface, QueryRunner} from 'typeorm';

export class AuthLoginModel1641614522311 implements MigrationInterface {
    name = 'AuthLoginModel1641614522311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "auth_logins" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "accessToken" character varying,
                "accessExpireTime" TIMESTAMP(0),
                "refreshToken" character varying,
                "refreshExpireTime" TIMESTAMP(0),
                "ipAddress" character varying,
                "location" character varying,
                "userAgent" character varying,
                "isRevoked" boolean NOT NULL DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                "updateTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8de2a717930a2561041f3a478db" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "auth_logins"
        `);
    }
}
