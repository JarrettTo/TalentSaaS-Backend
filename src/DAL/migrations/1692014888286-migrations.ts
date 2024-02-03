import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1692014888286 implements MigrationInterface {
  name = "Migrations1692014888286";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" ADD "isArchived" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "isArchived"`);
  }
}
