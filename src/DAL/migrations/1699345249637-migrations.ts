import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699345249637 implements MigrationInterface {
    name = 'Migrations1699345249637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_8fbf396becb048ef52625d6d9f4"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_7c543188e56bcdf073df45f3752"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "placementId"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "placementId"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "isInstagram" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "isYoutube" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "isTiktok" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "influencerId" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "isInstagram" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "isYoutube" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "isTiktok" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_79cd9e14a6e35c7302e7562337c" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_79cd9e14a6e35c7302e7562337c"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "isTiktok"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "isYoutube"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "isInstagram"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "influencerId"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "isTiktok"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "isYoutube"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "isInstagram"`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "placementId" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "placementId" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_7c543188e56bcdf073df45f3752" FOREIGN KEY ("placementId") REFERENCES "placement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_8fbf396becb048ef52625d6d9f4" FOREIGN KEY ("placementId") REFERENCES "placement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
