import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeLogCountryInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.country.insight.entity";

export class YoutubeLogCountryInsightRepository extends BaseRepository<YoutubeLogCountryInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogCountryInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<YoutubeLogCountryInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new YoutubeLogCountryInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
