import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698761067275 implements MigrationInterface {
  name = "Migrations1698761067275";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quote" ("id" SERIAL NOT NULL, "totalFee" numeric NOT NULL DEFAULT '20', "verifyCode" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "placementId" integer, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "placement" ADD "ASF" numeric`);
    await queryRunner.query(`ALTER TABLE "placement" ADD "isItems" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "placement-log" ADD "ASF" numeric`);
    await queryRunner.query(`ALTER TABLE "placement-log" ADD "isItems" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "quote" ADD CONSTRAINT "FK_8fbf396becb048ef52625d6d9f4" FOREIGN KEY ("placementId") REFERENCES "placement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_8fbf396becb048ef52625d6d9f4"`);
    await queryRunner.query(`ALTER TABLE "placement-log" DROP COLUMN "isItems"`);
    await queryRunner.query(`ALTER TABLE "placement-log" DROP COLUMN "ASF"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "isItems"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP COLUMN "ASF"`);
    await queryRunner.query(`DROP TABLE "quote"`);
  }
}
