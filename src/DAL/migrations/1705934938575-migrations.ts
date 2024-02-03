import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705934938575 implements MigrationInterface {
    name = 'Migrations1705934938575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "strategy" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "strategy" DROP COLUMN "createdAt"`);
    }

}
