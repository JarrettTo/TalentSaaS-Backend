import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokGenderInsightEntity } from "src/DAL/entities/tiktok/tiktok.gender.insight.entity";

export class TiktokGenderInsightRepository extends BaseRepository<TiktokGenderInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokGenderInsightEntity));
  }
}
