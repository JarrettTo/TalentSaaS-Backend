import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1689923632000 implements MigrationInterface {
  name = "Migrations1689923632000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
    await queryRunner.query(`ALTER TABLE "confirm-email-token" DROP CONSTRAINT "FK_ac1f11b3baa0a10105915d1394d"`);
    await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "userId" TO "managerId"`);
    await queryRunner.query(`ALTER TABLE "confirm-email-token" RENAME COLUMN "userId" TO "managerId"`);
    await queryRunner.query(
      `CREATE TABLE "influencer" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "tiktok-profile" character varying NOT NULL, "instagram-profile" character varying NOT NULL, "TFN" character varying NOT NULL, "isHelp" boolean NOT NULL, "super-fund" character varying NOT NULL, "birthday" date NOT NULL, "gift-ideas" character varying NOT NULL, "anniversary" date, "notes" text, "avatar" character varying, "managerId" integer, CONSTRAINT "UQ_350a096b383e1bccd7b673f9b04" UNIQUE ("email"), CONSTRAINT "UQ_fad2598e57ec782ff1c9e9e143d" UNIQUE ("phone"), CONSTRAINT "UQ_da7350cf7e8dcb8fcf7eb9a304a" UNIQUE ("tiktok-profile"), CONSTRAINT "UQ_716ca8e72002e5f110391c9a2df" UNIQUE ("instagram-profile"), CONSTRAINT "UQ_5f5f817f3903fdcfbc87e9a7c82" UNIQUE ("TFN"), CONSTRAINT "UQ_7230f2ecf9ff132d9d9fdc04faf" UNIQUE ("super-fund"), CONSTRAINT "UQ_18476cd8da39f8284374261dfad" UNIQUE ("avatar"), CONSTRAINT "PK_932fc0c1fbb494513647d1854be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_631d22d1f73b3279bb224c5200" ON "influencer" ("firstname", "lastname") `,
    );
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean DEFAULT false, CONSTRAINT "UQ_ee8fba4edb704ce2465753a2edd" UNIQUE ("email"), CONSTRAINT "UQ_ea876aead0cd3fc00f5be18e88c" UNIQUE ("password"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_d058d66f32e578353047d9188c3" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_f07af9723ead9683884d1d5560c" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "confirm-email-token" ADD CONSTRAINT "FK_e3fdcd358b300748538d929a466" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "confirm-email-token" DROP CONSTRAINT "FK_e3fdcd358b300748538d929a466"`);
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_f07af9723ead9683884d1d5560c"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_d058d66f32e578353047d9188c3"`);
    await queryRunner.query(`DROP TABLE "manager"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_631d22d1f73b3279bb224c5200"`);
    await queryRunner.query(`DROP TABLE "influencer"`);
    await queryRunner.query(`ALTER TABLE "confirm-email-token" RENAME COLUMN "managerId" TO "userId"`);
    await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "managerId" TO "userId"`);
    await queryRunner.query(
      `ALTER TABLE "confirm-email-token" ADD CONSTRAINT "FK_ac1f11b3baa0a10105915d1394d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
