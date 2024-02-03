import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690544449150 implements MigrationInterface {
  name = "Migrations1690544449150";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "facebook-token" RENAME COLUMN "IgId" TO "igId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "facebook-token" RENAME COLUMN "igId" TO "IgId"`);
  }
}
