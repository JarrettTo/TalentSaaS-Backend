import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1695905751937 implements MigrationInterface {
  name = "Migrations1695905751937";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" ADD "charityOfChoice" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "charityOfChoice"`);
  }
}
