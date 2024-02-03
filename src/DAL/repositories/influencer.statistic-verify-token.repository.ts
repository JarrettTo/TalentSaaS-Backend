import { InfluencerStatisticVerifyTokenEntity } from "./../entities/influencer.statistic-verify-token";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, MoreThan, MoreThanOrEqual } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";

export class InfluencerStatisticVerifyTokenRepository extends BaseRepository<InfluencerStatisticVerifyTokenEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InfluencerStatisticVerifyTokenEntity));
  }

  public async getValidToken(verifyCode: string, influencerId: number): Promise<InfluencerStatisticVerifyTokenEntity> {
    return await this._repository.findOne({
      where: {
        code: verifyCode,
        influencer: {
          id: influencerId,
        },
        expiredAt: MoreThanOrEqual(new Date()),
      },
    });
  }

  public async getValidTokenWithOutInfluencer(verifyCode: string): Promise<InfluencerStatisticVerifyTokenEntity> {
    return await this._repository.findOne({
      where: {
        code: verifyCode,
        expiredAt: MoreThanOrEqual(new Date()),
      },
    });
  }
}
