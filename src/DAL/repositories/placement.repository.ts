import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PlacementEntity } from "src/DAL/entities/placement.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

export class PlacementRepository extends BaseRepository<PlacementEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(PlacementEntity));
  }

  public async getAllSortedWithInfluencer(): Promise<PlacementEntity[]> {
    const query = this._repository
      .createQueryBuilder("placement")
      .leftJoinAndSelect("placement.influencer", "influencer")
      .leftJoinAndSelect("influencer.placementsLog", "placementsLog", "placementsLog.type = placement.type")
      .leftJoinAndSelect("placementsLog.manager", "manager")

      .orderBy("influencer.id", "ASC")
      .addOrderBy("placement.type", "ASC")
    
      .addOrderBy("placementsLog.createdAt", "DESC");

    return await query.getMany();
  }

  public async getAllByInfluencerId(influencerId: number): Promise<PlacementEntity[]> {
    return await this._repository.find({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }

  public async getByInfluencerIdAndType(influencerId: number, type: PlacementType): Promise<PlacementEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
        type: type,
      },
    });
  }
}
