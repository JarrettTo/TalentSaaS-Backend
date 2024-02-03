import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699359188338 implements MigrationInterface {
    name = 'Migrations1699359188338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote-log-list" ("id" SERIAL NOT NULL, "quoteListId" integer, CONSTRAINT "PK_1babc5151815a4c198011b1b0f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quote-list" ("id" SERIAL NOT NULL, "verifyCode" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "isArchived" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cb6f37523c6757279acfa1030a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "verifyCode"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "expiredAt"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "expiredAt"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "verifyCode"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "quoteLogListId" integer`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "quoteListId" integer`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD CONSTRAINT "FK_0e061f83203a418ef53d4a83cdd" FOREIGN KEY ("quoteLogListId") REFERENCES "quote-log-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" ADD CONSTRAINT "FK_2421be1df2c35552218d394cd03" FOREIGN KEY ("quoteListId") REFERENCES "quote-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_14905de907cb711b49a597d4d2c" FOREIGN KEY ("quoteListId") REFERENCES "quote-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_14905de907cb711b49a597d4d2c"`);
        await queryRunner.query(`ALTER TABLE "quote-log-list" DROP CONSTRAINT "FK_2421be1df2c35552218d394cd03"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP CONSTRAINT "FK_0e061f83203a418ef53d4a83cdd"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "quoteListId"`);
        await queryRunner.query(`ALTER TABLE "quote-log" DROP COLUMN "quoteLogListId"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "verifyCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "expiredAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "expiredAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote-log" ADD "verifyCode" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "quote-list"`);
        await queryRunner.query(`DROP TABLE "quote-log-list"`);
    }

}
