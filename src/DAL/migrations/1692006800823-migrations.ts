import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1692006800823 implements MigrationInterface {
  name = "Migrations1692006800823";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "placement" DROP CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0"`);
    await queryRunner.query(`ALTER TABLE "placement-token" DROP CONSTRAINT "FK_9b2631f43517804cb8945d069f0"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_78f328baa4a736d2501b3a6654b"`);
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_588214660777b5be67132a5e8ca"`);
    await queryRunner.query(
      `ALTER TABLE "placement" ADD CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement-token" ADD CONSTRAINT "FK_9b2631f43517804cb8945d069f0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-insights" ADD CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_78f328baa4a736d2501b3a6654b" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_588214660777b5be67132a5e8ca" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tiktok-insights" DROP CONSTRAINT "FK_588214660777b5be67132a5e8ca"`);
    await queryRunner.query(`ALTER TABLE "youtube-insights" DROP CONSTRAINT "FK_78f328baa4a736d2501b3a6654b"`);
    await queryRunner.query(`ALTER TABLE "instagram-insights" DROP CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5"`);
    await queryRunner.query(`ALTER TABLE "placement-token" DROP CONSTRAINT "FK_9b2631f43517804cb8945d069f0"`);
    await queryRunner.query(`ALTER TABLE "placement" DROP CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0"`);
    await queryRunner.query(
      `ALTER TABLE "tiktok-insights" ADD CONSTRAINT "FK_588214660777b5be67132a5e8ca" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "youtube-insights" ADD CONSTRAINT "FK_78f328baa4a736d2501b3a6654b" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instagram-insights" ADD CONSTRAINT "FK_d66db64a99e54a7e1b38588ccb5" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement-token" ADD CONSTRAINT "FK_9b2631f43517804cb8945d069f0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "placement" ADD CONSTRAINT "FK_6baaba7cf0a5c8c1ec001769cb0" FOREIGN KEY ("influencerId") REFERENCES "influencer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
