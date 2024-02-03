import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696860791770 implements MigrationInterface {
  name = "Migrations1696860791770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "influencer-group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_943492cacbb4af387b6c93e29f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" ADD "groupId" integer`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_851189e114acb5bd018c6471d1a" FOREIGN KEY ("groupId") REFERENCES "influencer-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_851189e114acb5bd018c6471d1a"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "groupId"`);
    await queryRunner.query(`DROP TABLE "influencer-group"`);
  }
}
