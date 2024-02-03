import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699965005414 implements MigrationInterface {
    name = 'Migrations1699965005414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tiktok-business-token" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "openId" character varying NOT NULL, "influencerId" integer, CONSTRAINT "PK_ff8b6b7b3848dd330f3aae3550b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tiktok-business-token" ADD CONSTRAINT "FK_556f91dae207a9f017b6061bfa3" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiktok-business-token" DROP CONSTRAINT "FK_556f91dae207a9f017b6061bfa3"`);
        await queryRunner.query(`DROP TABLE "tiktok-business-token"`);
    }

}
