import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramLogCountryInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.country.insight.entity";

export class InstagramLogCountryInsightRepository extends BaseRepository<InstagramLogCountryInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramLogCountryInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramLogCountryInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramLogCountryInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
