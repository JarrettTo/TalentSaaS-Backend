import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699606844754 implements MigrationInterface {
    name = 'Migrations1699606844754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tiktok-video" ("id" SERIAL NOT NULL, "tiktokId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "publishedAt" TIMESTAMP NOT NULL, "views" integer NOT NULL, "comments" integer NOT NULL, "likes" integer NOT NULL, "influencerId" integer, CONSTRAINT "PK_59c0e4cac9e61255d47524ead72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tiktok-video" ADD CONSTRAINT "FK_15858d7ec7a8a76b55c75054335" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-video" DROP CONSTRAINT "FK_15858d7ec7a8a76b55c75054335"`);
        await queryRunner.query(`DROP TABLE "tiktok-video"`);
    }

}
