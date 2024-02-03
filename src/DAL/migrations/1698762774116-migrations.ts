import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698762774116 implements MigrationInterface {
  name = "Migrations1698762774116";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quote" ADD "name" character varying`);
    await queryRunner.query(`ALTER TABLE "quote" ADD "brand" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "brand"`);
    await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "name"`);
  }
}
