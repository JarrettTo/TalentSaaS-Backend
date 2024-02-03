import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InstagramLogAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.age.insight.entity";

export class InstagramLogAgeInsightRepository extends BaseRepository<InstagramLogAgeInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InstagramLogAgeInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<InstagramLogAgeInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new InstagramLogAgeInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
