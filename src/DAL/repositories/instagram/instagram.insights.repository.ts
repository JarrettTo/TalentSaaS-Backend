import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, LessThan } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramInsightsEntity } from "src/DAL/entities/instagram/instagram.insights.entity";

export class InstagramInsightsRepository extends BaseRepository<InstagramInsightsEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramInsightsEntity));
  }

  public async getAllFull(): Promise<InstagramInsightsEntity[]> {
    const query = this._repository
      .createQueryBuilder("insight")
      .leftJoinAndSelect("insight.countries", "countries")
      .leftJoinAndSelect("insight.genderAges", "ages")
      .leftJoinAndSelect("insight.influencer", "influencer");

    return await query.getMany();
  }

  public async getFullByInfluencerId(influencerId: number): Promise<InstagramInsightsEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
      relations: {
        countries: true,
        genders: true,
        ages: true,
      },
    });
  }

  public async getFirstNotUpdatedToday(): Promise<InstagramInsightsEntity> {
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

  public async getLastRecord(): Promise<InstagramInsightsEntity> {
    return await this._repository.findOne({
      order: {
        id: "DESC",
      },
    });
  }

  public async getByInfluencerId(influencerId: number): Promise<InstagramInsightsEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }
}
