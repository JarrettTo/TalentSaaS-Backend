import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690201389659 implements MigrationInterface {
  name = "Migrations1690201389659";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "placement-token" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "type" integer NOT NULL, "influencerId" integer, CONSTRAINT "PK_a652956a986b2dfff9fa8f05400" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement-token" ADD CONSTRAINT "FK_9b2631f43517804cb8945d069f0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement-token" DROP CONSTRAINT "FK_9b2631f43517804cb8945d069f0"`);
    await queryRunner.query(`DROP TABLE "placement-token"`);
  }
}
