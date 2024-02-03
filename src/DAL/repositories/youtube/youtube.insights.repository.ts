import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeInsightsEntity } from "src/DAL/entities/youtube/youtube.insights.entity";

export class YoutubeInsightsRepository extends BaseRepository<YoutubeInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeInsightsEntity));
  }

  public async getLastRecord(): Promise<YoutubeInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getFirstNotUpdatedToday(): Promise<YoutubeInsightsEntity> {
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

  public async getFullByInfluencerId(influencerId: number): Promise<YoutubeInsightsEntity> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.ages", "ages")
      .leftJoinAndSelect("insight.genders", "genders")
      .leftJoinAndSelect("insight.rate", "rate")
      .leftJoinAndSelect("insight.devices", "devices")
      .leftJoinAndSelect("insight.influencer", "influencer")
      .where(`influencer.id = ${influencerId}`);

    return await query.getOne();
  }

  public async getAllFull(): Promise<YoutubeInsightsEntity[]> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.ages", "ages")
      .leftJoinAndSelect("insight.genders", "genders")
      .leftJoinAndSelect("insight.influencer", "influencer");

    return await query.getMany();
  }

  public async getByInfluencerId(influencerId: number): Promise<YoutubeInsightsEntity> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.influencer", "influencer")
      .where(`influencer.id = ${influencerId}`);

    return await query.getOne();
  }
}
