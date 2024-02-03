import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramCountryInsightEntity } from "src/DAL/entities/instagram/instagram.country.insight.entity";
import { InstagramAgeInsightEntity } from "src/DAL/entities/instagram/instagram.age.insight.entity";

export class InstagramAgeInsightRepository extends BaseRepository<InstagramAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramCountryInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
