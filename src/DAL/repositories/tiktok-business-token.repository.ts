import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { BaseRepository } from "./base.repository";
import { TiktokBusinessTokenEntity } from "../entities/tiktok-business-token.entity";

@Injectable()
export class TiktokBusinessTokenRepository extends BaseRepository<TiktokBusinessTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokBusinessTokenEntity));
  }

  public async getByInfluencerId(influencerId: number): Promise<TiktokBusinessTokenEntity> {
    return await this._repository.findOne({
      where: {
        influencer: {
          id: influencerId,
        },
      },
    });
  }
}
