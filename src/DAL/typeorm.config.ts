import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";

import { TokenEntity } from "src/DAL/entities/token.entity";
import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { ConfirmEmailTokenEntity } from "src/DAL/entities/confirm-email.entity";
import { InfluencerEntity } from "src/DAL/entities/influencer.entity";
import { PlacementEntity } from "src/DAL/entities/placement.entity";
import { PlacementTokenEntity } from "./entities/placement-token.entity";
import { FacebookToken } from "src/DAL/entities/facebook-token.entity";
import { InstagramInsightsEntity } from "./entities/instagram/instagram.insights.entity";
import { InstagramCountryInsightEntity } from "./entities/instagram/instagram.country.insight.entity";
import { YoutubeAgeInsightEntity } from "./entities/youtube/youtube.age.insight.entity";
import { YoutubeCountryInsightEntity } from "./entities/youtube/youtube.country.insight.entity";
import { YoutubeGenderInsightEntity } from "./entities/youtube/youtube.gender.insight.entity";
import { YoutubeInsightsEntity } from "./entities/youtube/youtube.insights.entity";
import { TiktokTokenEntity } from "./entities/tiktok-token.entity";
import { TiktokAgeInsightEntity } from "./entities/tiktok/tiktok.age.insight.entity";
import { TiktokCountryInsightEntity } from "./entities/tiktok/tiktok.country.insight.entity";
import { TiktokGenderInsightEntity } from "./entities/tiktok/tiktok.gender.insight.entity";
import { TiktokInsightsEntity } from "./entities/tiktok/tiktok.insights.entity";
import { InfluencerGroupEntity } from "./entities/influencer-group.entity";
import { ResetPasswordTokenEntity } from "./entities/reset-password.entity";
import { InfluencerStatisticVerifyTokenEntity } from "./entities/influencer.statistic-verify-token";
import { InstagramGenderInsightEntity } from "./entities/instagram/instagram.gender.insight.entity";
import { InstagramAgeInsightEntity } from "./entities/instagram/instagram.age.insight.entity";
import { YoutubeCompletionRateInsightEntity } from "./entities/youtube/youtube.complation-rate.insight.entity";
import { YoutubeDevicesInsightEntity } from "./entities/youtube/youtube.devices.insight.entity";
import { YoutubeLogAgeInsightEntity } from "./entities/youtube/log/youtube-log.age.insight.entity";
import { YoutubeLogCompletionRateInsightEntity } from "./entities/youtube/log/youtube-log.complation-rate.insight.entity";
import { YoutubeLogCountryInsightEntity } from "./entities/youtube/log/youtube-log.country.insight.entity";
import { YoutubeLogDevicesInsightEntity } from "./entities/youtube/log/youtube-log.devices.insight.entity";
import { YoutubeLogGenderInsightEntity } from "./entities/youtube/log/youtube-log.gender.insight.entity";
import { YoutubeLogInsightsEntity } from "./entities/youtube/log/youtube-log.insights.entity";
import { TiktokLogCountryInsightEntity } from "./entities/tiktok/log/tiktok-log.country.insight.entity";
import { TiktokLogAgeInsightEntity } from "./entities/tiktok/log/tiktok-log.age.insight.entity";
import { TiktokLogGenderInsightEntity } from "./entities/tiktok/log/tiktok-log.gender.insight.entity";
import { TiktokLogInsightsEntity } from "./entities/tiktok/log/tiktok-log.insights.entity";
import { InstagramLogAgeInsightEntity } from "./entities/instagram/log/instagram-log.age.insight.entity";
import { InstagramLogCountryInsightEntity } from "./entities/instagram/log/instagram-log.country.insight.entity";
import { InstagramLogGenderInsightEntity } from "./entities/instagram/log/instagram-log.gender.insight.entity";
import { InstagramLogInsightsEntity } from "./entities/instagram/log/instagram-log.insights.entity";
import { InstagramGenderAgeInsightEntity } from "./entities/instagram/instagram.gender-age.insight.entity";
import { InstagramLogGenderAgeInsightEntity } from "./entities/instagram/log/instagram-log.gender-age.insight.entity";
import { PlacementLogEntity } from "./entities/placement-log.entity";
import { QuoteEntity } from "./entities/quote.entity";
import { QuoteLogEntity } from "./entities/quote-log.entity";
import { QuoteListEntity } from "./entities/quote-list.entity";
import { QuoteLogListEntity } from "./entities/quote-log-list.entity";

import { TiktokBusinessTokenEntity } from "./entities/tiktok-business-token.entity";
import { TiktokDeviceInsightEntity } from "./entities/tiktok/tiktok.device.insight.entity";
import { TiktokLogDeviceInsightEntity } from "./entities/tiktok/log/tiktok-log.device.insight.entity";

import { TiktokVideoEntity } from "./entities/tiktok/tiktok.video.entity";
import { PlacementLastLogEntity } from "./entities/placement-last-log.entity";
import { StrategyEntity } from "./entities/strategy.entity";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: +process.env.DB_PORT as number,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  entities: [
    ManagerEntity,
    StrategyEntity,
    TokenEntity,
    ConfirmEmailTokenEntity,
    InfluencerEntity,
    PlacementEntity,
    PlacementTokenEntity,
    FacebookToken,
    TiktokTokenEntity,
    PlacementLogEntity,
    PlacementLastLogEntity,

    InstagramInsightsEntity,
    InstagramCountryInsightEntity,
    InstagramAgeInsightEntity,
    InstagramGenderAgeInsightEntity,
    InstagramGenderInsightEntity,
    InstagramGenderAgeInsightEntity,

    InstagramLogInsightsEntity,
    InstagramLogCountryInsightEntity,
    InstagramLogAgeInsightEntity,
    InstagramLogGenderAgeInsightEntity,
    InstagramLogGenderInsightEntity,

    YoutubeInsightsEntity,
    YoutubeAgeInsightEntity,
    YoutubeGenderInsightEntity,
    YoutubeCountryInsightEntity,
    YoutubeDevicesInsightEntity,
    YoutubeCompletionRateInsightEntity,

    YoutubeLogInsightsEntity,
    YoutubeLogAgeInsightEntity,
    YoutubeLogGenderInsightEntity,
    YoutubeLogCountryInsightEntity,
    YoutubeLogDevicesInsightEntity,
    YoutubeLogCompletionRateInsightEntity,

    TiktokInsightsEntity,
    TiktokAgeInsightEntity,
    TiktokGenderInsightEntity,
    TiktokCountryInsightEntity,

    TiktokLogInsightsEntity,
    TiktokLogAgeInsightEntity,
    TiktokLogGenderInsightEntity,
    TiktokLogCountryInsightEntity,

    InfluencerStatisticVerifyTokenEntity,
    InfluencerGroupEntity,
    ResetPasswordTokenEntity,
    QuoteEntity,
    QuoteLogEntity,

    QuoteListEntity,
    QuoteLogListEntity,

    TiktokBusinessTokenEntity,
    TiktokDeviceInsightEntity,
    TiktokLogDeviceInsightEntity,
    TiktokVideoEntity,
  ],
  migrations: [join(__dirname, "**", "migrations", "*.{js,ts}")],
  synchronize: false,
  migrationsRun: true,
  // dropSchema: true,
};


export const AppDataSource = new DataSource(options);
