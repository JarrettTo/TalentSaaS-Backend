import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691675581770 implements MigrationInterface {
  name = "Migrations1691675581770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tiktok-token" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "influencerId" integer, CONSTRAINT "PK_0b177c8479f80fbd18be11836aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-token" ADD CONSTRAINT "FK_8246c06dafc7147174a756555ef" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-token" DROP CONSTRAINT "FK_8246c06dafc7147174a756555ef"`);
    await queryRunner.query(`DROP TABLE "tiktok-token"`);
  }
}
