import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeLogDevicesInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.devices.insight.entity";

export class YoutubeLogDevicesInsightRepository extends BaseRepository<YoutubeLogDevicesInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogDevicesInsightEntity));
  }
}
