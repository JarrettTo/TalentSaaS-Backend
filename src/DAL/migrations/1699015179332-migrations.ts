import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699015179332 implements MigrationInterface {
    name = 'Migrations1699015179332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" ADD "paidMedia" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "paidMedia" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "paidMedia"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "paidMedia"`);
    }

}
