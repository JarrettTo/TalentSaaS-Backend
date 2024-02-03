import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690270736998 implements MigrationInterface {
  name = "Migrations1690270736998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_31a6fcabea71e9b66fc5c268e02" UNIQUE ("bankBSB")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_8fb7fc7d053ec89f9831e094d96" UNIQUE ("bankAccountNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_2192a80891616bfa96236d631f5" UNIQUE ("yourPhone")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_2192a80891616bfa96236d631f5"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_8fb7fc7d053ec89f9831e094d96"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_31a6fcabea71e9b66fc5c268e02"`);
  }
}
