import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { ConfirmEmailTokenEntity } from "src/DAL/entities/confirm-email.entity";

export class ConfirmEmailRepository extends BaseRepository<ConfirmEmailTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(ConfirmEmailTokenEntity));
  }

  public async getByToken(token: string): Promise<ConfirmEmailTokenEntity> {
    return await this._repository.findOne({
      where: { token },
      relations: {
        manager: true,
      },
    });
  }
  public async getByManagerEmail(email: string): Promise<ConfirmEmailTokenEntity> {
    return await this._repository.findOne({
      where: {
        manager: {
          email: email,
        },
      },
      relations: {
        manager: true,
      },
    });
  }
}
