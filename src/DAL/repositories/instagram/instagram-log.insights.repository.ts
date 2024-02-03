import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramLogInsightsEntity } from "src/DAL/entities/instagram/log/instagram-log.insights.entity";

export class InstagramLogInsightsRepository extends BaseRepository<InstagramLogInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramLogInsightsEntity));
  }

  public async getAllFull(): Promise<InstagramLogInsightsEntity[]> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.genderAges", "ages")
      .leftJoinAndSelect("insight.influencer", "influencer");

    return await query.getMany();
  }

  public async getFullByInfluencerId(influencerId: number): Promise<InstagramLogInsightsEntity> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.genderAges", "genderAges")
      .leftJoinAndSelect("insight.genders", "gender")
      .leftJoinAndSelect("insight.ages", "ages")
      .leftJoinAndSelect("insight.manager", "manager")
      .leftJoin("insight.influencer", "influencer")
      .where(`influencer.id = ${influencerId}`);
    return await query.getOne();
  }

  public async getFirstNotUpdatedToday(): Promise<InstagramLogInsightsEntity> {
    return await this._repository.findOne({
      where: {
        date: LessThan(new Date()),
        influencer: {
          isArchived: false,
        },
      },
      relations: {
        influencer: true,
      },
    });
  }

  public async getLastRecord(): Promise<InstagramLogInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getByInfluencerId(influencerId: number): Promise<InstagramLogInsightsEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }

  public async removeAllByInfluencerId(influencerId: number): Promise<void> {
    const query = this._repository.createQueryBuilder("insight").where(`influencer.id = ${influencerId}`).delete().execute();
  }
}
