import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691418123450 implements MigrationInterface {
  name = "Migrations1691418123450";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP COLUMN "engagement"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ADD "engagement" numeric NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP COLUMN "engagement"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ADD "engagement" integer NOT NULL DEFAULT '0'`);
  }
}
