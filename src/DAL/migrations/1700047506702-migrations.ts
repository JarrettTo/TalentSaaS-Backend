import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700047506702 implements MigrationInterface {
    name = 'Migrations1700047506702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tiktok-device-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalInsightsId" integer, CONSTRAINT "PK_e8fa2969a3b4cf6d1563123b41b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tiktok-log-device-insight" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" numeric NOT NULL DEFAULT '0', "personalLogInsightsId" integer, CONSTRAINT "PK_14426f776c86fb074a7806f16c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tiktok-device-insight" ADD CONSTRAINT "FK_cd2da4b86fb4c02a5a7db1402ab" FOREIGN KEY ("personalInsightsId") REFERENCES "tiktok-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tiktok-log-device-insight" ADD CONSTRAINT "FK_190d885b0c6d52a8c025ab4ddb2" FOREIGN KEY ("personalLogInsightsId") REFERENCES "tiktok-log-insights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-log-device-insight" DROP CONSTRAINT "FK_190d885b0c6d52a8c025ab4ddb2"`);
        await queryRunner.query(`ALTER TABLE "tiktok-device-insight" DROP CONSTRAINT "FK_cd2da4b86fb4c02a5a7db1402ab"`);
        await queryRunner.query(`DROP TABLE "tiktok-log-device-insight"`);
        await queryRunner.query(`DROP TABLE "tiktok-device-insight"`);
    }

}
