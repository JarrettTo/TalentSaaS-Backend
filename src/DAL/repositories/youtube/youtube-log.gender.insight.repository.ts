import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeLogGenderInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.gender.insight.entity";

export class YoutubeLogGenderInsightRepository extends BaseRepository<YoutubeLogGenderInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogGenderInsightEntity));
  }
}
