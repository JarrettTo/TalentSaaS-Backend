import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696925649530 implements MigrationInterface {
  name = "Migrations1696925649530";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" ADD "contractStartDate" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "contractEndDate" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "contractEndDate"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "contractStartDate"`);
  }
}
