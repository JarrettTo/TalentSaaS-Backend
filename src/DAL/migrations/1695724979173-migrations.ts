import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1695724979173 implements MigrationInterface {
  name = "Migrations1695724979173";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" ADD "refreshToken" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" DROP COLUMN "refreshToken"`);
  }
}
