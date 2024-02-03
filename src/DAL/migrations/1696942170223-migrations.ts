import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696942170223 implements MigrationInterface {
  name = "Migrations1696942170223";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "havePartner"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "havePartner" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "havePartner"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "havePartner" boolean`);
  }
}
