import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690383519559 implements MigrationInterface {
  name = "Migrations1690383519559";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "facebook-token" ("id" SERIAL NOT NULL, "value" character varying, "securityStamp" character varying NOT NULL, "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "IgId" integer, CONSTRAINT "PK_b92a527bb38ac4a0e521b318fcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" ADD "facebookTokenId" integer`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_26978ab2082ec8fbe131e199e57" UNIQUE ("facebookTokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_26978ab2082ec8fbe131e199e57" FOREIGN KEY ("facebookTokenId") REFERENCES "facebook-token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_26978ab2082ec8fbe131e199e57"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_26978ab2082ec8fbe131e199e57"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "facebookTokenId"`);
    await queryRunner.query(`DROP TABLE "facebook-token"`);
  }
}
