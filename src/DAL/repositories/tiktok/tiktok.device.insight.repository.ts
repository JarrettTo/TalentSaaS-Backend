import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { TiktokDeviceInsightEntity } from "src/DAL/entities/tiktok/tiktok.device.insight.entity";

export class TiktokDeviceInsightRepository extends BaseRepository<TiktokDeviceInsightEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokDeviceInsightEntity));
  }

  public async getByNameOrGenerateNewEntity(name: string): Promise<TiktokDeviceInsightEntity> {
    let record = await this._repository.findOne({
      where: {
        name: name,
      },
    });

    if (record != null) {
      return record;
    }
    record = new TiktokDeviceInsightEntity();
    record.name = name;
    return record;
  }

  public async removeAllWitchNotIncludeNames(names: string[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("name <> ALL(:names)", { names }).execute();
  }
}
