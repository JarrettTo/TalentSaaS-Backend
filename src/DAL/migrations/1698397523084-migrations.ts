import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698397523084 implements MigrationInterface {
  name = "Migrations1698397523084";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-insights" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" ADD "videosCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" ADD "videosCount" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "FK_0263a064784985e24ced5df942e"`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "REL_0263a064784985e24ced5df942"`);
    await queryRunner.query(`ALTER TABLE "instagram-log-insights" DROP CONSTRAINT "FK_d562b9480d75118c4e2be74eb00"`);
    await queryRunner.query(`ALTER TABLE "instagram-log-insights" DROP CONSTRAINT "REL_d562b9480d75118c4e2be74eb0"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058"`);
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "REL_1ccd1861442a28d37e90e5a205"`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "FK_0263a064784985e24ced5df942e" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-insights" ADD CONSTRAINT "FK_d562b9480d75118c4e2be74eb00" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-log-insights" DROP CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058"`);
    await queryRunner.query(`ALTER TABLE "instagram-log-insights" DROP CONSTRAINT "FK_d562b9480d75118c4e2be74eb00"`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP CONSTRAINT "FK_0263a064784985e24ced5df942e"`);
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "REL_1ccd1861442a28d37e90e5a205" UNIQUE ("influencerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-log-insights" ADD CONSTRAINT "FK_1ccd1861442a28d37e90e5a2058" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-insights" ADD CONSTRAINT "REL_d562b9480d75118c4e2be74eb0" UNIQUE ("influencerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-log-insights" ADD CONSTRAINT "FK_d562b9480d75118c4e2be74eb00" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "REL_0263a064784985e24ced5df942" UNIQUE ("influencerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-log-insights" ADD CONSTRAINT "FK_0263a064784985e24ced5df942e" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP COLUMN "videosCount"`);
    await queryRunner.query(`ALTER TABLE "tiktok-log-insights" DROP COLUMN "likesCount"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP COLUMN "videosCount"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP COLUMN "likesCount"`);
  }
}
