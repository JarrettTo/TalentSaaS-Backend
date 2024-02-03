import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { YoutubeAgeInsightEntity } from "src/DAL/entities/youtube/youtube.age.insight.entity";
import { YoutubeLogAgeInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.age.insight.entity";

export class YoutubeLogAgeInsightRepository extends BaseRepository<YoutubeLogAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(YoutubeLogAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<YoutubeLogAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new YoutubeLogAgeInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
