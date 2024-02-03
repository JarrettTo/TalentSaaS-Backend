import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1700661849952 implements MigrationInterface {
    name = 'Migrations1700661849952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_8e498741a4b496263472d4ddffd"`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "REL_8e498741a4b496263472d4ddff"`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_8e498741a4b496263472d4ddffd" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "placement-last-log" DROP CONSTRAINT "FK_8e498741a4b496263472d4ddffd"`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "REL_8e498741a4b496263472d4ddff" UNIQUE ("influencerId")`);
        await queryRunner.query(`ALTER TABLE "placement-last-log" ADD CONSTRAINT "FK_8e498741a4b496263472d4ddffd" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
