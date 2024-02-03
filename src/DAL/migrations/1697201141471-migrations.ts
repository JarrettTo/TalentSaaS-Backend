import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697201141471 implements MigrationInterface {
  name = "Migrations1697201141471";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_851189e114acb5bd018c6471d1a"`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_851189e114acb5bd018c6471d1a" FOREIGN KEY ("groupId") REFERENCES "influencer-group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_851189e114acb5bd018c6471d1a"`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_851189e114acb5bd018c6471d1a" FOREIGN KEY ("groupId") REFERENCES "influencer-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
