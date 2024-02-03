import { Module } from "@nestjs/common";

import { PlacementRepository } from "src/DAL/repositories/placement.repository";
import { TokenRepository } from "src/DAL/repositories/token.repository";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { ConfirmEmailRepository } from "src/DAL/repositories/confirm-email-token.repository";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { FacebookTokenRepository } from "src/DAL/repositories/facebook-token.repository";
import { PlacementTokenRepository } from "src/DAL/repositories/placement-token.repository";
import { YoutubeGenderInsightRepository } from "./youtube/youtube.gender.insight.repository";
import { InstagramCountryInsightRepository } from "./instagram/instagram.country.insight.repository";
import { InstagramInsightsRepository } from "./instagram/instagram.insights.repository";
import { YoutubeAgeInsightRepository } from "./youtube/youtube.age.insight.repository";
import { YoutubeCountryInsightRepository } from "./youtube/youtube.country.insight.repository";
import { YoutubeInsightsRepository } from "./youtube/youtube.insights.repository";
import { TiktokTokenRepository } from "./tiktok-token.repository";
import { TiktokAgeInsightRepository } from "./tiktok/tiktok.age.insight.repository";
import { TiktokCountryInsightRepository } from "./tiktok/tiktok.country.insight.repository";
import { TiktokGenderInsightRepository } from "./tiktok/tiktok.gender.insight.repository";
import { TiktokInsightsRepository } from "./tiktok/tiktok.insights.repository";
import { InfluencerStatisticVerifyTokenRepository } from "./influencer.statistic-verify-token.repository";
import { InfluencerGroupRepository } from "./influencer-group.repository";
import { ResetPasswordTokenRepository } from "./reset-password-token.repository";
import { InstagramAgeInsightRepository } from "./instagram/instagram.age.insight.repository";
import { InstagramGenderInsightRepository } from "./instagram/instagram.gender.insight.repository";
import { YoutubeLogCompletionRateInsightRepository } from "./youtube/youtube-log.completion-rate.insight.repository";
import { YoutubeLogDevicesInsightRepository } from "./youtube/youtube-log.devices.insight.repository";
import { YoutubeCompletionRateInsightRepository } from "./youtube/youtube.completion-rate.insight.repository";
import { YoutubeDevicesInsightRepository } from "./youtube/youtube.devices.insight.repository";
import { YoutubeLogInsightsRepository } from "./youtube/youtube-log.insights.repository";
import { InstagramLogGenderAgeInsightRepository } from "./instagram/instagram-log.gender-age.insight.repository";
import { InstagramLogInsightsRepository } from "./instagram/instagram-log.insights.repository";
import { TiktokLogInsightsRepository } from "./tiktok/tiktok-log.insights.repository";
import { InstagramLogAgeInsightRepository } from "./instagram/instagram-log.age.insight.repository";
import { InstagramLogCountryInsightRepository } from "./instagram/instagram-log.country.insight.repository";
import { InstagramLogGenderInsightRepository } from "./instagram/instagram-log.gender.insight.repository";
import { TiktokLogAgeInsightRepository } from "./tiktok/tiktok-log.age.insight.repository";
import { TiktokLogCountryInsightRepository } from "./tiktok/tiktok-log.country.insight.repository";
import { TiktokLogGenderInsightRepository } from "./tiktok/tiktok-log.gender.insight.repository";
import { YoutubeLogGenderInsightRepository } from "./youtube/youtube-log.gender.insight.repository";
import { YoutubeLogAgeInsightRepository } from "./youtube/youtube-log.age.insight.repository";
import { YoutubeLogCountryInsightRepository } from "./youtube/youtube-log.country.insight.repository";
import { InstagramGenderAgeInsightRepository } from "./instagram/instagram.gender-age.insight.repository";
import { PlacementLogRepository } from "./placement-log.repository";
import { QuoteRepository } from "./quotes.repository";
import { QuoteLogRepository } from "./quotes-log.repository";
import { QuoteLogListRepository } from "./quotes-log-list.repository";
import { QuoteListRepository } from "./quote-list.repository";

import { TiktokBusinessTokenRepository } from "./tiktok-business-token.repository";
import { TiktokDeviceInsightRepository } from "./tiktok/tiktok.device.insight.repository";
import { TiktokVideoRepository } from "./tiktok-video.repository";
import { PlacementLastLogRepository } from "./placement-last-log.repository";
import { StrategyRepository } from "./strategy.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [
    TokenRepository,
    ManagerRepository,
    ConfirmEmailRepository,
    InfluencerRepository,
    StrategyRepository,
    PlacementRepository,
    PlacementTokenRepository,
    FacebookTokenRepository,
    TiktokTokenRepository,
    PlacementLogRepository,
    PlacementLastLogRepository,

    InstagramInsightsRepository,
    InstagramCountryInsightRepository,
    InstagramGenderInsightRepository,
    InstagramGenderAgeInsightRepository,
    InstagramAgeInsightRepository,
    InstagramGenderAgeInsightRepository,

    YoutubeInsightsRepository,
    YoutubeCountryInsightRepository,
    YoutubeAgeInsightRepository,
    YoutubeGenderInsightRepository,
    YoutubeDevicesInsightRepository,
    YoutubeCompletionRateInsightRepository,

    TiktokInsightsRepository,
    TiktokCountryInsightRepository,
    TiktokAgeInsightRepository,
    TiktokGenderInsightRepository,

    InfluencerStatisticVerifyTokenRepository,
    InfluencerGroupRepository,
    ResetPasswordTokenRepository,

    InstagramLogAgeInsightRepository,
    InstagramLogCountryInsightRepository,
    InstagramLogGenderInsightRepository,
    InstagramLogGenderAgeInsightRepository,
    InstagramLogInsightsRepository,

    TiktokLogAgeInsightRepository,
    TiktokLogCountryInsightRepository,
    TiktokLogGenderInsightRepository,
    TiktokLogInsightsRepository,

    YoutubeLogInsightsRepository,
    YoutubeLogAgeInsightRepository,
    YoutubeLogCountryInsightRepository,
    YoutubeLogGenderInsightRepository,
    YoutubeLogInsightsRepository,
    YoutubeLogCompletionRateInsightRepository,
    YoutubeLogDevicesInsightRepository,

    QuoteRepository,
    QuoteLogRepository,

    QuoteLogListRepository,
    QuoteListRepository,
    TiktokBusinessTokenRepository,
    TiktokDeviceInsightRepository,
    TiktokVideoRepository,
  ],
  exports: [
    TokenRepository,
    ManagerRepository,
    ConfirmEmailRepository,
    InfluencerRepository,
    StrategyRepository,
    PlacementRepository,
    PlacementTokenRepository,
    FacebookTokenRepository,
    TiktokTokenRepository,

    InstagramInsightsRepository,
    InstagramCountryInsightRepository,
    InstagramGenderInsightRepository,
    InstagramGenderAgeInsightRepository,
    InstagramAgeInsightRepository,
    InstagramGenderAgeInsightRepository,

    YoutubeInsightsRepository,
    YoutubeCountryInsightRepository,
    YoutubeAgeInsightRepository,
    YoutubeGenderInsightRepository,
    YoutubeDevicesInsightRepository,
    YoutubeCompletionRateInsightRepository,

    TiktokInsightsRepository,
    TiktokCountryInsightRepository,
    TiktokAgeInsightRepository,
    TiktokGenderInsightRepository,

    InfluencerStatisticVerifyTokenRepository,
    InfluencerGroupRepository,
    ResetPasswordTokenRepository,
    PlacementLogRepository,
    PlacementLastLogRepository,

    InstagramLogAgeInsightRepository,
    InstagramLogCountryInsightRepository,
    InstagramLogGenderInsightRepository,
    InstagramLogGenderAgeInsightRepository,
    InstagramLogInsightsRepository,

    TiktokLogAgeInsightRepository,
    TiktokLogCountryInsightRepository,
    TiktokLogGenderInsightRepository,
    TiktokLogInsightsRepository,

    YoutubeLogInsightsRepository,
    YoutubeLogAgeInsightRepository,
    YoutubeLogCountryInsightRepository,
    YoutubeLogGenderInsightRepository,
    YoutubeLogInsightsRepository,
    YoutubeLogCompletionRateInsightRepository,
    YoutubeLogDevicesInsightRepository,

    QuoteRepository,
    QuoteLogRepository,

    QuoteLogListRepository,
    QuoteListRepository,
    TiktokBusinessTokenRepository,
    TiktokDeviceInsightRepository,
    TiktokVideoRepository,
  ],
})
export class RepositoryModule {}
