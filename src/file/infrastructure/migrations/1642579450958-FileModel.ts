import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileModel1642579450958 implements MigrationInterface {
    name = 'FileModel1642579450958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "files" (
                "id" SERIAL NOT NULL,
                "uid" character varying(36),
                "title" character varying NOT NULL,
                "fileName" character varying NOT NULL,
                "fileSize" integer NOT NULL,
                "fileMimeType" character varying NOT NULL,
                "folder" character varying NOT NULL,
                "createTime" TIMESTAMP(0) NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "files"
        `);
    }
}
