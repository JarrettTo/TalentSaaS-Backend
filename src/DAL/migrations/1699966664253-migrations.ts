import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699966664253 implements MigrationInterface {
    name = 'Migrations1699966664253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4"`);
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "quoteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4"`);
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "quoteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
