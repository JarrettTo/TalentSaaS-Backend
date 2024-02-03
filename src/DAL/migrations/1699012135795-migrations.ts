import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699012135795 implements MigrationInterface {
    name = 'Migrations1699012135795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "isArchived" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "isArchived"`);
    }

}
