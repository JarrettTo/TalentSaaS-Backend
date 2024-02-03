import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramCountryInsightEntity } from "src/DAL/entities/instagram/instagram.country.insight.entity";
import { InstagramGenderInsightEntity } from "src/DAL/entities/instagram/instagram.gender.insight.entity";
import { InstagramLogGenderInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender.insight.entity";

export class InstagramLogGenderInsightRepository extends BaseRepository<InstagramLogGenderInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramLogGenderInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramLogGenderInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramLogGenderInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
