import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699621432238 implements MigrationInterface {
    name = 'Migrations1699621432238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationDigitalRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationTraditionalRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "exclusivityRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationDigitalRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationTraditionalRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "exclusivityRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationDigitalMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationDigitalMonthsRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationTraditionalMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationTraditionalMonthsRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "exclusivityMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "exclusivityMonthsRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationDigitalMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationDigitalMonthsRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationTraditionalMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationTraditionalMonthsRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "exclusivityMonths" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "exclusivityMonthsRange" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "exclusivityMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "exclusivityMonths"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationTraditionalMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationTraditionalMonths"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationDigitalMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationDigitalMonths"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "exclusivityMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "exclusivityMonths"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationTraditionalMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationTraditionalMonths"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationDigitalMonthsRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationDigitalMonths"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "exclusivityRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationTraditionalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationDigitalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "exclusivityRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationTraditionalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationDigitalRange" integer`);
    }

}
