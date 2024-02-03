import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { LoggerService } from "@unistory/nestjs-logger";

import { InstagramInsightsService } from "src/services/instagram-insights.service";
import { YoutubeService } from "src/services/youtube.service";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { YoutubeInsightsRepository } from "src/DAL/repositories/youtube/youtube.insights.repository";
import { InstagramInsightsRepository } from "src/DAL/repositories/instagram/instagram.insights.repository";
import { TiktokService } from "./tiktok.service";
import { TiktokInsightsRepository } from "src/DAL/repositories/tiktok/tiktok.insights.repository";
import { InfluencerService } from "./influencer.service";
import { TiktokBusinessService } from "./tiktok-buisness.service";

@Injectable()
export class CronService {
  constructor(
    private readonly _influencerService: InfluencerService,
    
    private readonly _instInsightsService: InstagramInsightsService,
    private readonly _instInsightsRepo: InstagramInsightsRepository,

    private readonly _youtubeService: YoutubeService,
    private readonly _youtubeInsightsRepo: YoutubeInsightsRepository,

    private readonly _tiktokService: TiktokService,
    private readonly _businessService: TiktokBusinessService,
    private readonly _tiktokInsightsRepo: TiktokInsightsRepository,

    private readonly _logger: LoggerService,
    private readonly _cfgService: ProjectConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateInstagramInsights(): Promise<void> {
    this._logger.info("START updateInstagramInsights START");
    try {
      this._logger.warn("updateInstagramInsights.notUpdatedInsight=");
      const notUpdatedInsight = await this._instInsightsRepo.getFirstNotUpdatedToday();
      console.log(notUpdatedInsight);

      if (notUpdatedInsight == null) {
        this._logger.info(`collection of facebook's insights is completed`);
        return;
      }
      await this._instInsightsService.updateLogStatistic(notUpdatedInsight.influencer.id)
      await this._instInsightsService.updateLocalDbStatistic(notUpdatedInsight.influencer.id);
      this._logger.info("END updateInstagramInsights END");
    } catch (err) {
      this._logger.warn(`update FacebookInsights ended with an error:${err}`);
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateYoutubeInsights(): Promise<void> {
    this._logger.info("START updateYoutubeInsights START");
    try {
      const notUpdatedInsight = await this._youtubeInsightsRepo.getFirstNotUpdatedToday();
      console.log(notUpdatedInsight);

      if (notUpdatedInsight == null) {
        this._logger.info(`collection of youtube's insights is completed`);
        return;
      }
      await this._instInsightsService.updateLogStatistic(notUpdatedInsight.influencer.id)
      await this._youtubeService.updateLocalDbStatistic(notUpdatedInsight.influencer.id);
      this._logger.info("END updateYoutubeInsights END");
    } catch (err) {
      this._logger.warn(`update YoutubeInsights ended with an error:${err}`);
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateTiktokInsights(): Promise<void> {
    this._logger.info("START updateTiktokInsights START");
    try {
      this._logger.warn("updateTiktokInsights.notUpdatedInsight=");
      const notUpdatedInsight = await this._tiktokInsightsRepo.getFirstNotUpdatedToday();
      console.log(notUpdatedInsight);

      if (notUpdatedInsight == null) {
        this._logger.info(`collection of tiktok's insights is completed`);
        return;
      }
      
        await this._tiktokService.refreshToken(notUpdatedInsight.influencer.id)
        await this._tiktokService.updateLogStatistic(notUpdatedInsight.influencer.id);
        await this._tiktokService.updateLocalDbStatistic(notUpdatedInsight.influencer.id);
    
        const businessTokens = await this._businessService.getTokens(notUpdatedInsight.influencer.id);
    
        if (businessTokens != null) {
          await this._businessService.refreshToken(notUpdatedInsight.influencer.id)
          await this._businessService.updateLogStatistic(notUpdatedInsight.influencer.id);
          await this._businessService.updateLocalDbStatistic(notUpdatedInsight.influencer.id);
        }
      this._logger.info("END updateTiktokInsights END");
    } catch (err) {
      this._logger.warn(`update TiktokInsights ended with an error:${err}`);
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateTiktokLocalVideos(): Promise<void> {
    this._logger.info("START updateTiktokLocalVideos START");
    try {
      const influencers = await this._influencerService.getAllActive()
      const influencersWithTikTok = influencers.filter(el => el.isTikTokConnected)

      for (const influencer of influencersWithTikTok) {
        await this._tiktokService.refreshToken(influencer.id)
        await this._tiktokService.updateLocalVideoList(influencer.id)
      }
      this._logger.info("END updateTiktokInsights END");
    } catch (err) {
      console.log(err);
      
      this._logger.warn(`update TiktokInsights ended with an error:${err}`);
    }
  }
}
