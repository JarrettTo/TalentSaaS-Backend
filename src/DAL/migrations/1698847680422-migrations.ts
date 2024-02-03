import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698847680422 implements MigrationInterface {
    name = 'Migrations1698847680422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote-log" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "totalFee" numeric NOT NULL DEFAULT '20', "name" character varying, "brand" character varying, "verifyCode" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "managerId" integer, "placementId" integer, "quoteId" integer, CONSTRAINT "PK_4ebcd34bb13d13f92c84ce2f0cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_e181d60b6c840e9fc130b949d44" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_7c543188e56bcdf073df45f3752" FOREIGN KEY ("placementId") REFERENCES "placement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4" FOREIGN KEY ("quoteId") REFERENCES "quote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_89abef2cd146722b40c03fb5ed4"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_7c543188e56bcdf073df45f3752"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_e181d60b6c840e9fc130b949d44"`);
        await queryRunner.query(`DROP TABLE "quote-log"`);
    }

}
