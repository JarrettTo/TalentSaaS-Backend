import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690899197720 implements MigrationInterface {
  name = "Migrations1690899197720";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "agencyFee" SET DEFAULT '20'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" ALTER COLUMN "agencyFee" DROP NOT NULL`);
  }
}
