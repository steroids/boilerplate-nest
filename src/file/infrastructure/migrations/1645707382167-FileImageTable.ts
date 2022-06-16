import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileImageTable1645707382167 implements MigrationInterface {
    name = 'FileImageTable1645707382167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images"
            ADD CONSTRAINT "FK_7f30f5efb7ba62730b396c17c18" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "file_images" DROP CONSTRAINT "FK_7f30f5efb7ba62730b396c17c18"
        `);
    }
}
