import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697716082469 implements MigrationInterface {
  name = "Migrations1697716082469";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "instagram-gender-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalInsightsId" integer, CONSTRAINT "PK_2677b7871b44c7be4b25e40f314" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalInsightsId" integer, CONSTRAINT "PK_4f41ad47d422c9d9439b8d1aacb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-gender-insight" ADD CONSTRAINT "FK_09a7d0c59c115b72d60f3bd1705" FOREIGN KEY ("personalInsightsId") REFERENCES "instagram-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-age-insight" ADD CONSTRAINT "FK_200db7dc79acde42c492483977e" FOREIGN KEY ("personalInsightsId") REFERENCES "instagram-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-age-insight" DROP CONSTRAINT "FK_200db7dc79acde42c492483977e"`);
    await queryRunner.query(`ALTER TABLE "instagram-gender-insight" DROP CONSTRAINT "FK_09a7d0c59c115b72d60f3bd1705"`);
    await queryRunner.query(`DROP TABLE "instagram-age-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-gender-insight"`);
  }
}
