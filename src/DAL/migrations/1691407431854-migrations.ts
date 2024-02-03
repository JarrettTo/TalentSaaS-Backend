import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691407431854 implements MigrationInterface {
  name = "Migrations1691407431854";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP COLUMN "engagement"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" ADD "engagement" numeric NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP COLUMN "engagement"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" ADD "engagement" integer NOT NULL DEFAULT '0'`);
  }
}
