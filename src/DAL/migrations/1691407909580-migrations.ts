import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691407909580 implements MigrationInterface {
  name = "Migrations1691407909580";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-gender-age-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "instagram-gender-age-insight" ADD "count" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "instagram-country-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "instagram-country-insight" ADD "count" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "youtube-country-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "youtube-country-insight" ADD "count" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "youtube-age-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "youtube-age-insight" ADD "count" numeric NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-age-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "youtube-age-insight" ADD "count" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "youtube-country-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "youtube-country-insight" ADD "count" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "instagram-country-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "instagram-country-insight" ADD "count" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "instagram-gender-age-insight" DROP COLUMN "count"`);
    await queryRunner.query(`ALTER TABLE "instagram-gender-age-insight" ADD "count" integer NOT NULL`);
  }
}
