import { TiktokBusinessService } from "./tiktok-buisness.service";
import { FileService } from "./file.service";
import { LoggerService } from "@unistory/nestjs-logger";
import { AuthService } from "src/services/auth.service";
import { ManagerService } from "./manager.service";
import { ApiJWTService } from "./jwt.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

import { ApiConfigModule } from "src/modules/config.module";
import { RepositoryModule } from "src/DAL/repositories/repository.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { EmailService } from "src/services/email.service";
import { InfluencerService } from "src/services/influencer.service";
import { SeedService } from "src/services/seed.service";
import { HttpModule } from "@nestjs/axios";
import { FacebookTokenService } from "src/services/facebook-token.service";
import { YoutubeService } from "./youtube.service";
import { InstagramInsightsService } from "src/services/instagram-insights.service";
import { FacebookGraphService } from "src/services/facebook-graph.service";
import { CronService } from "./cron.service";
import { TotalStatisticService } from "./total-statistic.service";
import { TiktokService } from "./tiktok.service";
import { InfluencerGroupService } from "./influencer-group.service";
import { UrlShorterService } from "./url-shortter.service";
import { QuoteService } from "./quotes.service";
import { MapperService } from "./mapper.service";

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ScheduleModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ProjectConfigService) => ({
        secret: configService.accessTokenSecret,
        signOptions: {
          expiresIn: `${configService.accessTokenExpirationTime}ms`,
        },
      }),
      inject: [ProjectConfigService],
    }),
    ApiConfigModule,
    RepositoryModule,
    HttpModule,
  ],

  providers: [
    MapperService,
    AuthService,
    ManagerService,
    ApiJWTService,
    EmailService,
    InfluencerService,
    SeedService,
    YoutubeService,
    FacebookTokenService,
    InstagramInsightsService,
    FacebookGraphService,
    CronService,
    TotalStatisticService,
    TiktokService,
    FileService,
    InfluencerGroupService,
    UrlShorterService,
    QuoteService,
    TiktokBusinessService,
  ],
  exports: [
    AuthService,
    MapperService,
    InfluencerService,
    SeedService,
    ManagerService,
    YoutubeService,
    FacebookTokenService,
    InstagramInsightsService,
    TotalStatisticService,
    TiktokService,
    FileService,
    InfluencerGroupService,
    UrlShorterService,
    QuoteService,
    TiktokBusinessService,
  ],
})
export class ServiceModule {}
