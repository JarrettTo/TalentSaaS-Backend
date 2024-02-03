import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698328036644 implements MigrationInterface {
  name = "Migrations1698328036644";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "youtube-completion-rate-insight" ("id" SERIAL NOT NULL, "averageViewDuration" numeric NOT NULL DEFAULT '0', "averageViewPercentage" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_bea2fc35546dd63de066a855d75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-devices-insight" ("id" SERIAL NOT NULL, "MOBILE" numeric NOT NULL DEFAULT '0', "DESKTOP" numeric NOT NULL DEFAULT '0', "TV" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_2d14648208ea2388c9a554c1a8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-log-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_5fabe2e2303ffa15d6ccb5338b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-log-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_58dd49f6191dfc799ac1dc6e12a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-log-gender-insight" ("id" SERIAL NOT NULL, "maleCount" numeric NOT NULL DEFAULT '0', "femaleCount" numeric NOT NULL DEFAULT '0', "otherCount" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_4836d516086199a622b651f781b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tiktok-log-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL DEFAULT '0', "engagement" numeric NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "viewsCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "gendersId" integer, "influencerId" integer, "managerId" integer, CONSTRAINT "REL_f7aa3aae205c0dc1565714ae48" UNIQUE ("gendersId"), CONSTRAINT "REL_0263a064784985e24ced5df942" UNIQUE ("influencerId"), CONSTRAINT "PK_01d2e51f87276ebd187509bfad9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-log-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_810d5c1aa561eb00953abda6c90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-log-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_cabfaee1f6915b47586b176d90f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-log-gender-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_6664b44f9afc331c539b57ee9d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instagram-log-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL DEFAULT '0', "engagement" numeric NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "influencerId" integer, "managerId" integer, CONSTRAINT "REL_d562b9480d75118c4e2be74eb0" UNIQUE ("influencerId"), CONSTRAINT "PK_180d45b9a5c2953981a2d33d335" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-age-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_cd55efcb71b33a8c5391812aab6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-country-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_33b66e09e1769b6519ec1cc0fe4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-gender-insight" ("id" SERIAL NOT NULL, "maleCount" numeric NOT NULL DEFAULT '0', "femaleCount" numeric NOT NULL DEFAULT '0', "otherCount" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_f5d59a9b3cb707aafa1c686a882" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-devices-insight" ("id" SERIAL NOT NULL, "MOBILE" numeric NOT NULL DEFAULT '0', "DESKTOP" numeric NOT NULL DEFAULT '0', "TV" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_021c5e95d5ac85b0d911f90203b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-completion-rate-insight" ("id" SERIAL NOT NULL, "averageViewDuration" numeric NOT NULL DEFAULT '0', "averageViewPercentage" numeric NOT NULL DEFAULT '0', CONSTRAINT "PK_e0a00bbea4b682a431a5ad2f8aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "youtube-log-insights" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "impressions" integer NOT NULL DEFAULT '0', "engagement" numeric NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "gendersId" integer, "devicesId" integer, "completionRateId" integer, "influencerId" integer, "managerId" integer, CONSTRAINT "REL_f693e525a20b641b130c934e78" UNIQUE ("gendersId"), CONSTRAINT "REL_3951d93bd6b63f359bac4cdb33" UNIQUE ("devicesId"), CONSTRAINT "REL_d2a5920bf6a804ba4487a1b775" UNIQUE ("completionRateId"), CONSTRAINT "REL_1ccd1861442a28d37e90e5a205" UNIQUE ("influencerId"), CONSTRAINT "PK_847202d2a5530c39797723c4df3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "youtube-insights" ADD "completionRateId" integer`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "UQ_4b44eb6c3dd9d365220bdfcfed2" UNIQUE ("completionRateId")`,
    );
    await queryRunner.query(`ALTER TABLE "youtube-insights" ADD "devicesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "UQ_1c76d393c98083dbc115f0691f4" UNIQUE ("devicesId")`,
    );
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_588214660777b5be67132a5e8ca"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "REL_588214660777b5be67132a5e8c"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_4b44eb6c3dd9d365220bdfcfed2" FOREIGN KEY ("completionRateId") REFERENCES "youtube-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_1c76d393c98083dbc115f0691f4" FOREIGN KEY ("devicesId") REFERENCES "youtube-devices-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_588214660777b5be67132a5e8ca" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-age-insight" ADD CONSTRAINT "FK_025d98ca7dc92450737388f6940" FOREIGN KEY ("personalLogInsightsId") REFERENCES "tiktok-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-country-insight" ADD CONSTRAINT "FK_4285cc876c26404999aea0d5c62" FOREIGN KEY ("personalLogInsightsId") REFERENCES "tiktok-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "FK_f7aa3aae205c0dc1565714ae486" FOREIGN KEY ("gendersId") REFERENCES "tiktok-log-gender-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "FK_0263a064784985e24ced5df942e" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "FK_c550f22a93cb721990a3c4b4de1" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-country-insight" ADD CONSTRAINT "FK_71746521e04d55b2edcd4b51a96" FOREIGN KEY ("personalLogInsightsId") REFERENCES "instagram-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-age-insight" ADD CONSTRAINT "FK_6e37ed4b3843ba5af9ed2a283cb" FOREIGN KEY ("personalLogInsightsId") REFERENCES "instagram-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-gender-insight" ADD CONSTRAINT "FK_12415df0da5c08e2267d2ee2dbb" FOREIGN KEY ("personalLogInsightsId") REFERENCES "instagram-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-insights" ADD CONSTRAINT "FK_d562b9480d75118c4e2be74eb00" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-insights" ADD CONSTRAINT "FK_638e6c71f43ea7d6f3e7b970063" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-age-insight" ADD CONSTRAINT "FK_202378af4a2814ff44f2f1b3447" FOREIGN KEY ("personalLogInsightsId") REFERENCES "youtube-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-country-insight" ADD CONSTRAINT "FK_f531ce442f92cb5c329921f8434" FOREIGN KEY ("personalLogInsightsId") REFERENCES "youtube-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_f693e525a20b641b130c934e78c" FOREIGN KEY ("gendersId") REFERENCES "youtube-log-gender-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_3951d93bd6b63f359bac4cdb337" FOREIGN KEY ("devicesId") REFERENCES "youtube-log-devices-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_d2a5920bf6a804ba4487a1b775c" FOREIGN KEY ("completionRateId") REFERENCES "youtube-log-completion-rate-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_3b4cb9d50d10b82a9c9008b0085" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_3b4cb9d50d10b82a9c9008b0085"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_d2a5920bf6a804ba4487a1b775c"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_3951d93bd6b63f359bac4cdb337"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_f693e525a20b641b130c934e78c"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-log-country-insight" DROP CONSTRAINT "FK_f531ce442f92cb5c329921f8434"`,
    );
    await queryRunner.query(`ALTER TABLE "youtube-log-age-insight" DROP CONSTRAINT "FK_202378af4a2814ff44f2f1b3447"`);
    await queryRunner.query(`ALTER TABLE "instagram-log-insights" DROP CONSTRAINT "FK_638e6c71f43ea7d6f3e7b970063"`);
    await queryRunner.query(`ALTER TABLE "instagram-log-insights" DROP CONSTRAINT "FK_d562b9480d75118c4e2be74eb00"`);
    await queryRunner.query(
      `ALTER TABLE "instagram-log-gender-insight" DROP CONSTRAINT "FK_12415df0da5c08e2267d2ee2dbb"`,
    );
    await queryRunner.query(`ALTER TABLE "instagram-log-age-insight" DROP CONSTRAINT "FK_6e37ed4b3843ba5af9ed2a283cb"`);
    await queryRunner.query(
      `ALTER TABLE "instagram-log-country-insight" DROP CONSTRAINT "FK_71746521e04d55b2edcd4b51a96"`,
    );
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "FK_c550f22a93cb721990a3c4b4de1"`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "FK_0263a064784985e24ced5df942e"`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "FK_f7aa3aae205c0dc1565714ae486"`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-country-insight" DROP CONSTRAINT "FK_4285cc876c26404999aea0d5c62"`,
    );
    await queryRunner.query(`ALTER TABLE "tiktok-log-age-insight" DROP CONSTRAINT "FK_025d98ca7dc92450737388f6940"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_588214660777b5be67132a5e8ca"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_1c76d393c98083dbc115f0691f4"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_4b44eb6c3dd9d365220bdfcfed2"`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "REL_588214660777b5be67132a5e8c" UNIQUE ("influencerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_588214660777b5be67132a5e8ca" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "UQ_1c76d393c98083dbc115f0691f4"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP COLUMN "devicesId"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "UQ_4b44eb6c3dd9d365220bdfcfed2"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP COLUMN "completionRateId"`);
    await queryRunner.query(`DROP TABLE "youtube-log-insights"`);
    await queryRunner.query(`DROP TABLE "youtube-log-completion-rate-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-log-devices-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-log-gender-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-log-country-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-log-age-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-log-insights"`);
    await queryRunner.query(`DROP TABLE "instagram-log-gender-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-log-age-insight"`);
    await queryRunner.query(`DROP TABLE "instagram-log-country-insight"`);
    await queryRunner.query(`DROP TABLE "tiktok-log-insights"`);
    await queryRunner.query(`DROP TABLE "tiktok-log-gender-insight"`);
    await queryRunner.query(`DROP TABLE "tiktok-log-country-insight"`);
    await queryRunner.query(`DROP TABLE "tiktok-log-age-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-devices-insight"`);
    await queryRunner.query(`DROP TABLE "youtube-completion-rate-insight"`);
  }
}
