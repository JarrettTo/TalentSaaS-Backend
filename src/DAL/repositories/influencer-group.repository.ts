import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, In, IsNull, Not } from "typeorm";
import { ReadStream } from "typeorm/platform/PlatformTools";

import { BaseRepository } from "src/DAL/repositories/base.repository";

import { InfluencerGroupEntity } from "../entities/influencer-group.entity";

export class InfluencerGroupRepository extends BaseRepository<InfluencerGroupEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InfluencerGroupEntity));
  }

  public async getOneByName(name: string): Promise<InfluencerGroupEntity> {
    return await this._repository.findOne({ where: { name: name } });
  }
}
