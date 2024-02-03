import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699614984007 implements MigrationInterface {
    name = 'Migrations1699614984007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-video" ADD CONSTRAINT "UQ_2c79babba0d50eeed11dbc2902f" UNIQUE ("tiktokId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-video" DROP CONSTRAINT "UQ_2c79babba0d50eeed11dbc2902f"`);
    }

}
