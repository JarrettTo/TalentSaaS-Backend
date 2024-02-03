import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, In, IsNull, Not, SelectQueryBuilder } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { StrategyEntity } from "../entities/strategy.entity";

export class StrategyRepository extends BaseRepository<StrategyEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(StrategyEntity));
  }

  public async getStrategyByInfluencerId(influencerId: number): Promise<StrategyEntity[]> {
    const query = this._repository
      .createQueryBuilder("strategy")
      .where("strategy.influencer = :influencerId", { influencerId });
  
    return await query.getMany();
  }
  
}
