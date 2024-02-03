import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690194967114 implements MigrationInterface {
  name = "Migrations1690194967114";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "FK_d058d66f32e578353047d9188c3"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "managerId"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "mediaKitLink" character varying`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_c4ecbaa3395d872b1136e6a1d90" UNIQUE ("mediaKitLink")`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" ADD "youtube-profile" character varying`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_b68ebf2e1ff1984a91071b89604" UNIQUE ("youtube-profile")`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" ADD "streetAddress" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "bank" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "bankAccountName" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "bankBSB" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "bankAccountNumber" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "age" integer`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "havePartner" boolean`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "alcohol" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "leftOrRightHand" integer`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "shoeSize" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "dreamHolidayDestination" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "dreamBrandDestination" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "dreamCar" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "milkOfChoice" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "yourPhone" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "yourPhoneProvider" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "investmentService" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "supermarket" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "chemistOfChoice" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "bottleshopOfChoice" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "internetProvider" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "streaming" character varying`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "musicStreamingOfChoice" character varying`);
    await queryRunner.query(`DROP INDEX "public"."IDX_631d22d1f73b3279bb224c5200"`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "firstname" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "lastname" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "email" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "phone" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "tiktok-profile" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "instagram-profile" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "TFN" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "isHelp" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "super-fund" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "birthday" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "gift-ideas" DROP NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_631d22d1f73b3279bb224c5200" ON "influencer" ("firstname", "lastname") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_631d22d1f73b3279bb224c5200"`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "gift-ideas" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "birthday" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "super-fund" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "isHelp" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "TFN" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "instagram-profile" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "tiktok-profile" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "phone" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "email" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "lastname" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "influencer" ALTER COLUMN "firstname" SET NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_631d22d1f73b3279bb224c5200" ON "influencer" ("firstname", "lastname") `,
    );
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "musicStreamingOfChoice"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "streaming"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "internetProvider"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "bottleshopOfChoice"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "chemistOfChoice"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "supermarket"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "investmentService"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "yourPhoneProvider"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "yourPhone"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "milkOfChoice"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "dreamCar"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "dreamBrandDestination"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "dreamHolidayDestination"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "shoeSize"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "leftOrRightHand"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "alcohol"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "havePartner"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "bankAccountNumber"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "bankBSB"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "bankAccountName"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "bank"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "streetAddress"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_b68ebf2e1ff1984a91071b89604"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "youtube-profile"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_c4ecbaa3395d872b1136e6a1d90"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP COLUMN "mediaKitLink"`);
    await queryRunner.query(`ALTER TABLE "influencer" ADD "managerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "FK_d058d66f32e578353047d9188c3" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
