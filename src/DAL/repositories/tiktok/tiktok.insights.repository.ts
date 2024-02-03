import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokInsightsEntity } from "src/DAL/entities/tiktok/tiktok.insights.entity";

export class TiktokInsightsRepository extends BaseRepository<TiktokInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokInsightsEntity));
  }

  public async getLastRecord(): Promise<TiktokInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getFirstNotUpdatedToday(): Promise<TiktokInsightsEntity> {
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

  public async getFullByInfluencerId(influencerId: number): Promise<TiktokInsightsEntity> {
    return await this._repository.findOne({
      relations: {
        countries: true,
        ages: true,
        genders: true,
        influencer: true,
      },
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }

  public async getByInfluencerId(influencerId: number): Promise<TiktokInsightsEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }
  
}
