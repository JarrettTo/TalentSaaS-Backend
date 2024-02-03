import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691649723902 implements MigrationInterface {
  name = "Migrations1691649723902";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" ADD "gendersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "UQ_b0248de08925eac06445aff907e" UNIQUE ("gendersId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_b0248de08925eac06445aff907e" FOREIGN KEY ("gendersId") REFERENCES "youtube-gender-insight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_b0248de08925eac06445aff907e"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "UQ_b0248de08925eac06445aff907e"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP COLUMN "gendersId"`);
  }
}
