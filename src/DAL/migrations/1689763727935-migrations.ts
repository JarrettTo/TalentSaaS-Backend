import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1689763727935 implements MigrationInterface {
  name = "Migrations1689763727935";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("jti" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a3a8179b544ae23dfc9449582be" PRIMARY KEY ("jti"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "confirm-email-token" ("id" SERIAL NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_b4ea59e863c023ae28eb57547d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "confirm-email-token" ADD CONSTRAINT "FK_ac1f11b3baa0a10105915d1394d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "confirm-email-token" DROP CONSTRAINT "FK_ac1f11b3baa0a10105915d1394d"`);
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
    await queryRunner.query(`DROP TABLE "confirm-email-token"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
