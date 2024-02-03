import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeGenderInsightEntity } from "src/DAL/entities/youtube/youtube.gender.insight.entity";

export class YoutubeGenderInsightRepository extends BaseRepository<YoutubeGenderInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeGenderInsightEntity));
  }
}
