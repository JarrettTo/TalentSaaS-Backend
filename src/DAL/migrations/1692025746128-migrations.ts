import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1692025746128 implements MigrationInterface {
  name = "Migrations1692025746128";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "influencer-statistic-verify-token" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "influencerId" integer, CONSTRAINT "PK_1692f814759e5829e56c8973dd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer-statistic-verify-token" ADD CONSTRAINT "FK_e6cd17c5e9c37d8050535dd6747" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "influencer-statistic-verify-token" DROP CONSTRAINT "FK_e6cd17c5e9c37d8050535dd6747"`,
    );
    await queryRunner.query(`DROP TABLE "influencer-statistic-verify-token"`);
  }
}
