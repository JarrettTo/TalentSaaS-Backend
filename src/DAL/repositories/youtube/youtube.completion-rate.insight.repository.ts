import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeCompletionRateInsightEntity } from "src/DAL/entities/youtube/youtube.complation-rate.insight.entity";

export class YoutubeCompletionRateInsightRepository extends BaseRepository<YoutubeCompletionRateInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeCompletionRateInsightEntity));
  }
}
