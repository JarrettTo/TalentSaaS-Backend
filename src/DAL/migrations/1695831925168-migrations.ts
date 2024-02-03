import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1695831925168 implements MigrationInterface {
  name = "Migrations1695831925168";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" DROP CONSTRAINT "FK_8246c06dafc7147174a756555ef"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "super-fund"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "super-fund-name" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "super-fund-biller-code" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "super-fund-reference-number" character varying`);
    await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "agencyFee" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-token" ADD CONSTRAINT "FK_8246c06dafc7147174a756555ef" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" DROP CONSTRAINT "FK_8246c06dafc7147174a756555ef"`);
    await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "agencyFee" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "super-fund-reference-number"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "super-fund-biller-code"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "super-fund-name"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "super-fund" character varying`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-token" ADD CONSTRAINT "FK_8246c06dafc7147174a756555ef" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
