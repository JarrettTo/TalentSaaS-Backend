import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696864341995 implements MigrationInterface {
  name = "Migrations1696864341995";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" ADD "state" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "ABN" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "ABN"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "state"`);
  }
}
