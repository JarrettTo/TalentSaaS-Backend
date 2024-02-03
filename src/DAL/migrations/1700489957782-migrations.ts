import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700489957782 implements MigrationInterface {
  name = "Migrations1700489957782";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" ADD "username" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" DROP COLUMN "username"`);
  }
}
