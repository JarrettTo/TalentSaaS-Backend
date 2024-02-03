import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697116698728 implements MigrationInterface {
  name = "Migrations1697116698728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset-password-token" ("id" SERIAL NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "managerId" integer, CONSTRAINT "PK_aa413cbc9e3d4087dc3bc2c54cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reset-password-token" ADD CONSTRAINT "FK_b0a6a64e23176c2b39d88409a21" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reset-password-token" DROP CONSTRAINT "FK_b0a6a64e23176c2b39d88409a21"`);
    await queryRunner.query(`DROP TABLE "reset-password-token"`);
  }
}
