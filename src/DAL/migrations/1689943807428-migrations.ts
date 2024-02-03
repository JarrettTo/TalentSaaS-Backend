import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1689943807428 implements MigrationInterface {
  name = "Migrations1689943807428";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "placement" ("id" SERIAL NOT NULL, "type" integer NOT NULL, "super" numeric NOT NULL DEFAULT '11', "talantFee" numeric, "agencyFee" numeric, "influencerId" integer, CONSTRAINT "PK_4f8b29ee2db5213bcb38b6c71c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement" ADD CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" DROP CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0"`);
    await queryRunner.query(`DROP TABLE "placement"`);
  }
}
