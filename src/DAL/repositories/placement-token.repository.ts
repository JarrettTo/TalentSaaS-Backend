import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { PlacementTokenEntity } from "../entities/placement-token.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { BaseRepository } from "./base.repository";

@Injectable()
export class PlacementTokenRepository extends BaseRepository<PlacementTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(PlacementTokenEntity));
  }
  public async getByInfluencerIdAndType(influencerId: number, type: PlacementType) {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
    });
  }

  public async isTokenExist(influencerId: number, type: PlacementType) {
    const token = await this.getByInfluencerIdAndType(influencerId, type);
    return !!token;
  }
}
