import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700052800417 implements MigrationInterface {
    name = 'Migrations1700052800417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-insights" ADD "viewsAverage" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tiktok-log-insights" ADD "viewsAverage" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP COLUMN "viewsAverage"`);
        await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP COLUMN "viewsAverage"`);
    }

}
