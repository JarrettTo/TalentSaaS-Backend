import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { PlacementLastLogEntity } from "../entities/placement-last-log.entity";

export class PlacementLastLogRepository extends BaseRepository<PlacementLastLogEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(PlacementLastLogEntity));
  }

  public async getByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementLastLogEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
    });
  }

  public async getAllByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementLastLogEntity[]> {
    return await this._repository.find({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
    });
  }

  public async getOneByInfluencerIdAndTypeAndField(influencerId: number, type: PlacementType, field: string, value: string | number | boolean): Promise<PlacementLastLogEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        [field]: value,
        type: type,
      },
      relations: {
        manager: true
      }
    });
  }

  public async getAllWithInfluencerAndManager(): Promise<PlacementLastLogEntity[]> {
    return await this._repository.find({
      relations: {
        manager: true,
        influencer: true,
      }
    });
  }
}
