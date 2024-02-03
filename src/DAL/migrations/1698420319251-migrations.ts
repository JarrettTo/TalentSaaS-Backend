import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698420319251 implements MigrationInterface {
  name = "Migrations1698420319251";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "placement-log" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "type" integer NOT NULL, "super" numeric NOT NULL DEFAULT '11', "talantFee" numeric, "agencyFee" numeric NOT NULL DEFAULT '20', "total_impressions_by_current_month" numeric, "au_o_nz_auditory" numeric, "west_auditory" numeric, "sum" numeric, "price_in_usd" numeric, "price_in_aud" numeric, "boosting" numeric NOT NULL DEFAULT '100', "managerId" integer, "influencerId" integer, CONSTRAINT "PK_e13485edebb3f8e51045187116d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement-log" ADD CONSTRAINT "FK_3eb507bd883acf7bd7c08b68134" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement-log" ADD CONSTRAINT "FK_db069e7e8528fa247941b35daa4" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement-log" DROP CONSTRAINT "FK_db069e7e8528fa247941b35daa4"`);
    await queryRunner.query(`ALTER TABLE "placement-log" DROP CONSTRAINT "FK_3eb507bd883acf7bd7c08b68134"`);
    await queryRunner.query(`DROP TABLE "placement-log"`);
  }
}
