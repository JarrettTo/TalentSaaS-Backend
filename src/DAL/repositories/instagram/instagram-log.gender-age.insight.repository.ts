import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramLogGenderAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender-age.insight.entity";

export class InstagramLogGenderAgeInsightRepository extends BaseRepository<InstagramLogGenderAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramLogGenderAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramLogGenderAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramLogGenderAgeInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
