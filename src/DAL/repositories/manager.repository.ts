import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { ManagerEntity } from "src/DAL/entities/manager.entity";

export class ManagerRepository extends BaseRepository<ManagerEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(ManagerEntity));
  }

  public async getByEmail(email: string): Promise<ManagerEntity> {
    return await this._repository.findOne({ where: { email } });
  }
}
