import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700664765845 implements MigrationInterface {
    name = 'Migrations1700664765845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "REL_35d16193ed446e6d22d883e28f"`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_35d16193ed446e6d22d883e28f6"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_35d16193ed446e6d22d883e28f6" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
