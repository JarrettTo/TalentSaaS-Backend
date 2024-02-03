import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705829598612 implements MigrationInterface {
    name = 'Migrations1705829598612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "strategy" ("id" SERIAL NOT NULL, "influencer" integer, "manager" character varying, "tasks" character varying, "PR" character varying, "life" character varying, "high_level" character varying, "brand_strategy" character varying, "content_tiktok" character varying, "content_ig" character varying, "content_yt" character varying, "content_collabs" character varying, "tour" character varying, "hosting" character varying, "podcast" character varying, "film" character varying, "projects" character varying, CONSTRAINT "PK_733d2c3d4a73c020375b9b3581d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_35d16193ed446e6d22d883e28f6" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_35d16193ed446e6d22d883e28f6"`);
        await queryRunner.query(`DROP TABLE "strategy"`);
    }

}
