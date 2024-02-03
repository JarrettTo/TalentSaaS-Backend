import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokCountryInsightEntity } from "src/DAL/entities/tiktok/tiktok.country.insight.entity";

export class TiktokCountryInsightRepository extends BaseRepository<TiktokCountryInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokCountryInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<TiktokCountryInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new TiktokCountryInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
