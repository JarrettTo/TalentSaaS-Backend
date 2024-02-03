import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { ResetPasswordTokenEntity } from "src/DAL/entities/reset-password.entity";

export class ResetPasswordTokenRepository extends BaseRepository<ResetPasswordTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(ResetPasswordTokenEntity));
  }

  public async getByToken(token: string): Promise<ResetPasswordTokenEntity> {
    return await this._repository.findOne({
      where: { token },
      relations: {
        manager: true,
      },
    });
  }
  public async getByManagerEmail(email: string): Promise<ResetPasswordTokenEntity> {
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
