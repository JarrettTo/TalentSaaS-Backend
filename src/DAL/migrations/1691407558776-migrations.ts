import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691407558776 implements MigrationInterface {
  name = "Migrations1691407558776";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "maleCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "maleCount" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "femaleCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "femaleCount" numeric NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "otherCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "otherCount" numeric NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "otherCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "otherCount" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "femaleCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "femaleCount" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" DROP COLUMN "maleCount"`);
    await queryRunner.query(`ALTER TABLE "youtube-gender-insight" ADD "maleCount" integer NOT NULL`);
  }
}
