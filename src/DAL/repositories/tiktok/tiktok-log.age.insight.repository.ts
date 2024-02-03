import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokLogAgeInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.age.insight.entity";

export class TiktokLogAgeInsightRepository extends BaseRepository<TiktokLogAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokLogAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<TiktokLogAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new TiktokLogAgeInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
