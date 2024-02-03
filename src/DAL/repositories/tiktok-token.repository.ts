import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { TiktokTokenEntity } from "../entities/tiktok-token.entity";
import { BaseRepository } from "./base.repository";

@Injectable()
export class TiktokTokenRepository extends BaseRepository<TiktokTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokTokenEntity));
  }

  public async getByInfluencerId(influencerId: number): Promise<TiktokTokenEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }
}
