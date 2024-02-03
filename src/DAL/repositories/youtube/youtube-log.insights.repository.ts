import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeLogInsightsEntity } from "src/DAL/entities/youtube/log/youtube-log.insights.entity";

export class YoutubeLogInsightsRepository extends BaseRepository<YoutubeLogInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogInsightsEntity));
  }

  public async getLastRecord(): Promise<YoutubeLogInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getFirstNotUpdatedToday(): Promise<YoutubeLogInsightsEntity> {
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

  public async getFullByInfluencerId(influencerId: number): Promise<YoutubeLogInsightsEntity> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.ages", "ages")
      .leftJoinAndSelect("insight.genders", "genders")
      .leftJoinAndSelect("insight.influencer", "influencer")
      .where(`influencer.id = ${influencerId}`);

    return await query.getOne();
  }

  public async getAllFullWithManagerByInfluencerId(influencerId: number): Promise<YoutubeLogInsightsEntity[]> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.ages", "ages")
      .leftJoinAndSelect("insight.genders", "genders")
      .leftJoin("insight.influencer", "influencer")
      .leftJoinAndSelect("insight.manager", "manager")
      .leftJoinAndSelect("insight.devices", "devices")
      .leftJoinAndSelect(`insight.rate`, "rate")
      .orderBy("insight.createdAt", "DESC")

      .where(`influencer.id = ${influencerId}`);

    return await query.getMany();
  }

  public async getByInfluencerId(influencerId: number): Promise<YoutubeLogInsightsEntity> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.influencer", "influencer")
      .where(`influencer.id = ${influencerId}`);

    return await query.getOne();
  }
  public async removeAllByInfluencerId(influencerId: number): Promise<void> {
    const query = this._repository
      .createQueryBuilder("insight")
      .where(`influencer.id = ${influencerId}`)
      .delete()
      .execute();
  }
}
