import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { PlacementLogEntity } from "../entities/placement-log.entity";

export class PlacementLogRepository extends BaseRepository<PlacementLogEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(PlacementLogEntity));
  }

  public async getAllSortedWithInfluencer(): Promise<PlacementLogEntity[]> {
    const query = this._repository
      .createQueryBuilder("placement")
      .leftJoinAndSelect("placement.influencer", "influencer")
      .leftJoinAndSelect("placement.manager", "manager")
      .orderBy("influencer.id", "ASC")
      .addOrderBy("placement.type", "ASC");

    return await query.getMany();
  }

  public async getAllByInfluencerId(influencerId: number): Promise<PlacementLogEntity[]> {
    return await this._repository.find({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }

  public async getAllByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementLogEntity[]> {
    return await this._repository.find({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
    });
  }

  public async getLastByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementLogEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
      order: {
        createdAt: "DESC"
      },
      relations: {
        manager: true,
      }
    });
  }

  public async getOneByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementLogEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
      relations: {
        manager: true,
      }
    });
  }
}
