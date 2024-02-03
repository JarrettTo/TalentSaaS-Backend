import { Between, DataSource, FindOperator, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { BaseRepository } from "./base.repository";
import { TiktokVideoEntity } from "../entities/tiktok/tiktok.video.entity";
import { format } from 'date-fns';
@Injectable()
export class TiktokVideoRepository extends BaseRepository<TiktokVideoEntity> {

  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(TiktokVideoEntity));
  }

  public async getLastByInfluencerId(influencerId: number): Promise<TiktokVideoEntity> {
    return await this._repository.findOne({ 
      where: { influencer: { id: influencerId } },
      order: { publishedAt: "DESC"}
    });
  }

  public async removeAllByInfluencerId(influencerId: number): Promise<void> {
    const query = this._repository
      .createQueryBuilder("insight")
      .where(`influencer.id = ${influencerId}`)
      .delete()
      .execute();
  }

  public async getAllByInfluencerIdDate(influencerId: number, from?: string, to?: string): Promise<TiktokVideoEntity[]> {
    const query = this._repository.createQueryBuilder("video");

    query.leftJoin("video.influencer", "influencer");

    query.where(`influencer.id  = ${influencerId}`)

    if (from != null && to != null) {
      query.andWhere(`(video.publishedAt >= '${from}' and video.publishedAt <= '${to}')`)
    }
    else if (from != null) {
      query.andWhere(`(video.publishedAt >= '${from}')`)
    }
    else if (to != null) {
      query.andWhere(`(video.publishedAt <= '${to}')`)
    }

    return await query.getMany();

  }

}
