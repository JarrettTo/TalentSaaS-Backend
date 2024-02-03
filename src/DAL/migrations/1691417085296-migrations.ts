import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691417085296 implements MigrationInterface {
  name = "Migrations1691417085296";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "impressions" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "engagement" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "followersCount" SET DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "followersCount" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "engagement" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" ALTER COLUMN "impressions" DROP DEFAULT`);
  }
}
