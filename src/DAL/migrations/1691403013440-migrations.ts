import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691403013440 implements MigrationInterface {
  name = "Migrations1691403013440";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "instagram-gender-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "personalInsightsId" integer, CONSTRAINT "PK_395de12d9d0c4e1e2a7d4b1a729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "personalInsightsId" integer, CONSTRAINT "PK_61d1901c2492bc6bb145ac9a52a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL, "engagement" integer NOT NULL, "followersCount" integer NOT NULL, CONSTRAINT "PK_9652421a434b7d55017bbe93bd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "personalInsightsId" integer, CONSTRAINT "PK_cccbc7ed3b3144fe6354939c32b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-gender-insight" ("id" SERIAL NOT NULL, "maleCount" integer NOT NULL, "femaleCount" integer NOT NULL, "otherCount" integer NOT NULL, CONSTRAINT "PK_f5dbe4f45a09d51a8c7884f2630" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL DEFAULT '0', "engagement" integer NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "gendersId" integer, CONSTRAINT "REL_b0248de08925eac06445aff907" UNIQUE ("gendersId"), CONSTRAINT "PK_a466af0f32fd6c9b701481a38b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "personalInsightsId" integer, CONSTRAINT "PK_f247aec7ca93c203958a811e5a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-gender-age-insight" ADD CONSTRAINT "FK_5e16dd3235346f88c015794c786" FOREIGN KEY ("personalInsightsId") REFERENCES "instagram-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-country-insight" ADD CONSTRAINT "FK_663ccf8d4339ef4dda97ed60a32" FOREIGN KEY ("personalInsightsId") REFERENCES "instagram-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-country-insight" ADD CONSTRAINT "FK_ff17a13fbb2b8786bb830572e1e" FOREIGN KEY ("personalInsightsId") REFERENCES "youtube-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_b0248de08925eac06445aff907e" FOREIGN KEY ("gendersId") REFERENCES "youtube-gender-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-age-insight" ADD CONSTRAINT "FK_0f305cab2491f86fa8d735b4da5" FOREIGN KEY ("personalInsightsId") REFERENCES "youtube-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-age-insight" DROP CONSTRAINT "FK_0f305cab2491f86fa8d735b4da5"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_b0248de08925eac06445aff907e"`);
    await queryRunner.query(`ALTER TABLE "youtube-country-insight" DROP CONSTRAINT "FK_ff17a13fbb2b8786bb830572e1e"`);
    await queryRunner.query(`ALTER TABLE "instagram-country-insight" DROP CONSTRAINT "FK_663ccf8d4339ef4dda97ed60a32"`);
    await queryRunner.query(
      `ALTER TABLE "instagram-gender-age-insight" DROP CONSTRAINT "FK_5e16dd3235346f88c015794c786"`,
    );
    await queryRunner.query(`DROP TABLE "youtube-age-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-insights"`);
    await queryRunner.query(`DROP TABLE "youtube-gender-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-country-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-insights"`);
    await queryRunner.query(`DROP TABLE "instagram-country-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-gender-age-insight"`);
  }
}
