import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698413689834 implements MigrationInterface {
  name = "Migrations1698413689834";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_4b44eb6c3dd9d365220bdfcfed2"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" RENAME COLUMN "completionRateId" TO "rateId"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" RENAME CONSTRAINT "UQ_4b44eb6c3dd9d365220bdfcfed2" TO "UQ_2440af2e1a5561a8342c64e5322"`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_2440af2e1a5561a8342c64e5322" FOREIGN KEY ("rateId") REFERENCES "youtube-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_2440af2e1a5561a8342c64e5322"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" RENAME CONSTRAINT "UQ_2440af2e1a5561a8342c64e5322" TO "UQ_4b44eb6c3dd9d365220bdfcfed2"`,
    );
    await queryRunner.query(`ALTER TABLE "youtube-insights" RENAME COLUMN "rateId" TO "completionRateId"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_4b44eb6c3dd9d365220bdfcfed2" FOREIGN KEY ("completionRateId") REFERENCES "youtube-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
