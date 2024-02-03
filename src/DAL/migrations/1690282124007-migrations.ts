import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690282124007 implements MigrationInterface {
  name = "Migrations1690282124007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "anniversary"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "dreamBrandDestination"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "dreamBrandCollaboration" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_2192a80891616bfa96236d631f5"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_2192a80891616bfa96236d631f5" UNIQUE ("yourPhone")`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "dreamBrandCollaboration"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "dreamBrandDestination" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "anniversary" date`);
  }
}
