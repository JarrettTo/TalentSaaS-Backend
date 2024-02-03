import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691418538814 implements MigrationInterface {
  name = "Migrations1691418538814";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" ADD "influencerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "instagram-insights" ADD CONSTRAINT "UQ_d66db64a99e54a7e1b38588ccb5" UNIQUE ("influencerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-insights" ADD CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP CONSTRAINT "UQ_d66db64a99e54a7e1b38588ccb5"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP COLUMN "influencerId"`);
  }
}
