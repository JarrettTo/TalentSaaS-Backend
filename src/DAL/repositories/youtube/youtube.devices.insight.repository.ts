import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeDevicesInsightEntity } from "src/DAL/entities/youtube/youtube.devices.insight.entity";

export class YoutubeDevicesInsightRepository extends BaseRepository<YoutubeDevicesInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeDevicesInsightEntity));
  }
}
