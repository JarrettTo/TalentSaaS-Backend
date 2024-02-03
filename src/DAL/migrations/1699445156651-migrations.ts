import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699445156651 implements MigrationInterface {
    name = 'Migrations1699445156651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" ADD "brand" character varying`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" ADD "verifyCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" ADD "expiredAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-list" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "quote-list" ADD "brand" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-list" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "quote-list" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" DROP COLUMN "expiredAt"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" DROP COLUMN "verifyCode"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "brand" character varying`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "brand" character varying`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "name" character varying`);
    }

}
