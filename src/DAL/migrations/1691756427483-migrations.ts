import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691756427483 implements MigrationInterface {
  name = "Migrations1691756427483";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tiktok-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalInsightsId" integer, CONSTRAINT "PK_7fb3a384dbcb9e4d10ebeaef086" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalInsightsId" integer, CONSTRAINT "PK_ea2f80122ac9efb93ef6f40d24b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-gender-insight" ("id" SERIAL NOT NULL, "maleCount" numeric NOT NULL DEFAULT '0', "femaleCount" numeric NOT NULL DEFAULT '0', "otherCount" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_9c76d4b40cbe9c0594eef5f4c66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL DEFAULT '0', "engagement" numeric NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "viewsCount" integer NOT NULL DEFAULT '0', "gendersId" integer, "influencerId" integer, CONSTRAINT "REL_081b8d041e90c260bddc07d9ff" UNIQUE ("gendersId"), CONSTRAINT "REL_588214660777b5be67132a5e8c" UNIQUE ("influencerId"), CONSTRAINT "PK_53c3b84fa183cfdce25e03a8129" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-country-insight" ADD CONSTRAINT "FK_da3c6288d84fa8c46a43a9d1428" FOREIGN KEY ("personalInsightsId") REFERENCES "tiktok-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-age-insight" ADD CONSTRAINT "FK_7be74e71b9bfce5ce87157e807f" FOREIGN KEY ("personalInsightsId") REFERENCES "tiktok-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_081b8d041e90c260bddc07d9ffe" FOREIGN KEY ("gendersId") REFERENCES "tiktok-gender-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_588214660777b5be67132a5e8ca" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_588214660777b5be67132a5e8ca"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_081b8d041e90c260bddc07d9ffe"`);
    await queryRunner.query(`ALTER TABLE "tiktok-age-insight" DROP CONSTRAINT "FK_7be74e71b9bfce5ce87157e807f"`);
    await queryRunner.query(`ALTER TABLE "tiktok-country-insight" DROP CONSTRAINT "FK_da3c6288d84fa8c46a43a9d1428"`);
    await queryRunner.query(`DROP TABLE "tiktok-insights"`);
    await queryRunner.query(`DROP TABLE "tiktok-gender-insight"`);
    await queryRunner.query(`DROP TABLE "tiktok-age-insight"`);
    await queryRunner.query(`DROP TABLE "tiktok-country-insight"`);
  }
}
