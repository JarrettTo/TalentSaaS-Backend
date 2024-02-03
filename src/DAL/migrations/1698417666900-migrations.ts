import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698417666900 implements MigrationInterface {
  name = "Migrations1698417666900";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" ADD "total_impressions_by_current_month" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "au_o_nz_auditory" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "west_auditory" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "sum" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "price_in_usd" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "price_in_aud" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "boosting" numeric NOT NULL DEFAULT '100'`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "boosting"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "price_in_aud"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "price_in_usd"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "sum"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "west_auditory"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "au_o_nz_auditory"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "total_impressions_by_current_month"`);
  }
}
