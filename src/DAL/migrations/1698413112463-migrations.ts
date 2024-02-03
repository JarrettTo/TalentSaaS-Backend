import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698413112463 implements MigrationInterface {
  name = "Migrations1698413112463";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_d2a5920bf6a804ba4487a1b775c"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" RENAME COLUMN "completionRateId" TO "rateId"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_caf52e3b4ea57bb2031a19ac976" FOREIGN KEY ("rateId") REFERENCES "youtube-log-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_caf52e3b4ea57bb2031a19ac976"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" RENAME COLUMN "rateId" TO "completionRateId"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_d2a5920bf6a804ba4487a1b775c" FOREIGN KEY ("completionRateId") REFERENCES "youtube-log-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
