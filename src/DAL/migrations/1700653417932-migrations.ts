import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700653417932 implements MigrationInterface {
    name = 'Migrations1700653417932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "placement-last-log" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "managerId" integer, "id" SERIAL NOT NULL, "type" integer NOT NULL, "super" numeric, "talantFee" numeric, "agencyFee" numeric, "total_impressions_by_current_month" numeric, "au_o_nz_auditory" numeric, "west_auditory" numeric, "sum" numeric, "price_in_usd" numeric, "price_in_aud" numeric, "boosting" numeric, "ASF" numeric, "isItems" boolean, "influencerId" integer, CONSTRAINT "REL_35d16193ed446e6d22d883e28f" UNIQUE ("managerId"), CONSTRAINT "REL_8e498741a4b496263472d4ddff" UNIQUE ("influencerId"), CONSTRAINT "PK_8d5f3cdfccf1ec674745d8aa833" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_35d16193ed446e6d22d883e28f6" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_8e498741a4b496263472d4ddffd" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_8e498741a4b496263472d4ddffd"`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_35d16193ed446e6d22d883e28f6"`);
        await queryRunner.query(`DROP TABLE "placement-last-log"`);
    }

}
