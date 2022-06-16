import {MigrationInterface, QueryRunner} from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class UserModel1641614522311 implements MigrationInterface {
    name = 'UserModel1641614522311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_users" (
                "id" SERIAL NOT NULL,
                "role" character varying NOT NULL,
                "login" character varying,
                "lastName" character varying,
                "firstName" character varying,
                "email" character varying,
                "phone" character varying(16),
                "passwordHash" text,
                "language" character varying,
                "isBanned" boolean NOT NULL DEFAULT false,
                "isUnSubscribed" boolean NOT NULL DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                "updateTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                CONSTRAINT "PK_547608cc494a950dfd6fbcea21e" PRIMARY KEY ("id")
            )
        `);

        const passwordHash = await bcrypt.hash('1', 5);
        await queryRunner.query(`
            INSERT INTO "user_users"
            ("role", "login", "email", "passwordHash", "isBanned", "isUnSubscribed", "createTime", "updateTime")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
            'admin',
            'admin',
            'admin@admin.com',
            passwordHash,
            false,
            false,
            new Date(),
            new Date(),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_users"
        `);
    }
}
