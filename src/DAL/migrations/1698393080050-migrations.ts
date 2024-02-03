import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698393080050 implements MigrationInterface {
  name = "Migrations1698393080050";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "instagram-log-gender-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_20048b33604c183b702bacb0ce0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-gender-age-insight" ADD CONSTRAINT "FK_ce4a9347812aaee0d2689a90e12" FOREIGN KEY ("personalLogInsightsId") REFERENCES "instagram-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "instagram-log-gender-age-insight" DROP CONSTRAINT "FK_ce4a9347812aaee0d2689a90e12"`,
    );
    await queryRunner.query(`DROP TABLE "instagram-log-gender-age-insight"`);
  }
}
