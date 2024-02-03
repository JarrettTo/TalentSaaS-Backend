import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokLogGenderInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.gender.insight.entity";

export class TiktokLogGenderInsightRepository extends BaseRepository<TiktokLogGenderInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokLogGenderInsightEntity));
  }
}
