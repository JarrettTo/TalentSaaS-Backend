import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramGenderAgeInsightEntity } from "src/DAL/entities/instagram/instagram.gender-age.insight.entity";

export class InstagramGenderAgeInsightRepository extends BaseRepository<InstagramGenderAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramGenderAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramGenderAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramGenderAgeInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
