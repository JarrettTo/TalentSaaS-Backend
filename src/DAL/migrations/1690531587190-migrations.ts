import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690531587190 implements MigrationInterface {
  name = "Migrations1690531587190";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_631d22d1f73b3279bb224c5200"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_350a096b383e1bccd7b673f9b04"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_fad2598e57ec782ff1c9e9e143d"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_c4ecbaa3395d872b1136e6a1d90"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_5f5f817f3903fdcfbc87e9a7c82"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_31a6fcabea71e9b66fc5c268e02"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_8fb7fc7d053ec89f9831e094d96"`);
    await queryRunner.query(`ALTER TABLE "influencer" DROP CONSTRAINT "UQ_7230f2ecf9ff132d9d9fdc04faf"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_7230f2ecf9ff132d9d9fdc04faf" UNIQUE ("super-fund")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_8fb7fc7d053ec89f9831e094d96" UNIQUE ("bankAccountNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_31a6fcabea71e9b66fc5c268e02" UNIQUE ("bankBSB")`,
    );
    await queryRunner.query(`ALTER TABLE "influencer" ADD CONSTRAINT "UQ_5f5f817f3903fdcfbc87e9a7c82" UNIQUE ("TFN")`);
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_c4ecbaa3395d872b1136e6a1d90" UNIQUE ("mediaKitLink")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_fad2598e57ec782ff1c9e9e143d" UNIQUE ("phone")`,
    );
    await queryRunner.query(
      `ALTER TABLE "influencer" ADD CONSTRAINT "UQ_350a096b383e1bccd7b673f9b04" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_631d22d1f73b3279bb224c5200" ON "influencer" ("firstname", "lastname") `,
    );
  }
}
