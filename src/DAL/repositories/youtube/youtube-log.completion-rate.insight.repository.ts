import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeLogCompletionRateInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.complation-rate.insight.entity";

export class YoutubeLogCompletionRateInsightRepository extends BaseRepository<YoutubeLogCompletionRateInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogCompletionRateInsightEntity));
  }
}
