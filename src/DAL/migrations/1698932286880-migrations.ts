import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698932286880 implements MigrationInterface {
    name = 'Migrations1698932286880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" ADD "crossPost" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "instaStorySet" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "linkInBio" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationDigital" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationDigitalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationTraditional" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "amplificationTraditionalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "exclusivity" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "exclusivityRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "shootDay" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "UGCCreative" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "crossPost" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "instaStorySet" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "linkInBio" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationDigital" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationDigitalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationTraditional" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "amplificationTraditionalRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "exclusivity" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "exclusivityRange" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "shootDay" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "UGCCreative" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "UGCCreative"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "shootDay"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "exclusivityRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "exclusivity"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationTraditionalRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationTraditional"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationDigitalRange"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "amplificationDigital"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "linkInBio"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "instaStorySet"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "crossPost"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "UGCCreative"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "shootDay"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "exclusivityRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "exclusivity"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationTraditionalRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationTraditional"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationDigitalRange"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "amplificationDigital"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "linkInBio"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "instaStorySet"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "crossPost"`);
    }

}
