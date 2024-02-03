import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690384317208 implements MigrationInterface {
  name = "Migrations1690384317208";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "facebook-token" DROP COLUMN "IgId"`);
    await queryRunner.query(`ALTER TABLE "facebook-token" ADD "IgId" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "facebook-token" DROP COLUMN "IgId"`);
    await queryRunner.query(`ALTER TABLE "facebook-token" ADD "IgId" integer`);
  }
}
