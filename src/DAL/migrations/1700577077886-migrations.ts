import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700577077886 implements MigrationInterface {
    name = 'Migrations1700577077886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "totalFee" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "totalFee" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "totalFee" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "totalFee" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "totalFee" SET DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "totalFee" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "totalFee" SET DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "quote-log" ALTER COLUMN "totalFee" SET NOT NULL`);
    }

}
