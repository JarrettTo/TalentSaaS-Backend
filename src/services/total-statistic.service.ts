import { Injectable, NotFoundException } from "@nestjs/common";

import { v4 as uuid } from "uuid";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { TotalStatisticDto } from "src/dto/statistic/total-statistic.dto";
import { InfluencerStatisticVerifyTokenEntity } from "src/DAL/entities/influencer.statistic-verify-token";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { InfluencerStatisticVerifyTokenRepository } from "src/DAL/repositories/influencer.statistic-verify-token.repository";

@Injectable()
export class TotalStatisticService {
  public constructor(
    private readonly _influencerRepo: InfluencerRepository,
    private readonly _configService: ProjectConfigService,
    private readonly _statisticTokenRepository: InfluencerStatisticVerifyTokenRepository,
  ) {}

  public async getLastTotalStatistic(): Promise<TotalStatisticDto> {
    return await this._influencerRepo.getTotalStatistic();
  }

  public async generateStatisticVerifyCode(): Promise<string> {
    const verifyCode = new InfluencerStatisticVerifyTokenEntity();

    const code = uuid();
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + this._configService.influencerVerifyTokenLifeTime);

    verifyCode.code = code;
    verifyCode.expiredAt = expiredAt;

    await this._statisticTokenRepository.save(verifyCode);

    return code;
  }

  public async getInsightsForUnauthorizedUser(verifyCode: string): Promise<TotalStatisticDto> {
    const statisticToken = await this._statisticTokenRepository.getValidTokenWithOutInfluencer(verifyCode);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getLastTotalStatistic();
  }
}
