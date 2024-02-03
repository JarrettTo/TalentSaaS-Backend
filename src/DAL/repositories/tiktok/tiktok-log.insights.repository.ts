import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokLogInsightsEntity } from "src/DAL/entities/tiktok/log/tiktok-log.insights.entity";

export class TiktokLogInsightsRepository extends BaseRepository<TiktokLogInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokLogInsightsEntity));
  }

  public async getLastRecord(): Promise<TiktokLogInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getFirstNotUpdatedToday(): Promise<TiktokLogInsightsEntity> {
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

  public async getAllFullWithManagerByInfluencerId(influencerId: number): Promise<TiktokLogInsightsEntity[]> {
    return await this._repository.find({
      relations: {
        countries: true,
        ages: true,
        genders: true,
        influencer: true,
        manager: true,
      },
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }

  public async getByInfluencerId(influencerId: number): Promise<TiktokLogInsightsEntity> {
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
