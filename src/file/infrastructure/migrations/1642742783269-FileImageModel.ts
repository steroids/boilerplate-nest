import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageModel1642742783269 implements MigrationInterface {
    name = 'FileImageModel1642742783269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "file_images" (
                "id" SERIAL NOT NULL,
                "fileId" integer NOT NULL,
                "fileName" character varying NOT NULL,
                "fileSize" integer NOT NULL,
                "fileMimeType" character varying NOT NULL,
                "folder" character varying NOT NULL,
                "width" integer NOT NULL,
                "height" integer NOT NULL,
                "createTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aee19fee3f25906b6679f5ddd9d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "file_images"
        `);
    }
}
