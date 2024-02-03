import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokLogCountryInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.country.insight.entity";

export class TiktokLogCountryInsightRepository extends BaseRepository<TiktokLogCountryInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokLogCountryInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<TiktokLogCountryInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new TiktokLogCountryInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
