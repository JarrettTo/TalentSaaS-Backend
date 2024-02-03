import { Module } from "@nestjs/common";
import { ServiceModule } from "src/services/service.module";
import { RepositoryModule } from "src/DAL/repositories/repository.module";
import { AuthController } from "src/controllers/auth.controller";
import { InfluencerController } from "src/controllers/influencer.controller";
import { PassportModule } from "@nestjs/passport";

import { JwtStrategy } from "src/services/jwt.strategy";
import { ManagerController } from "./manager.controller";
import { FacebookController } from "src/controllers/facebook.controller";
import { YoutubeController } from "./youtube.controller";
import { InstagramInsightsController } from "src/controllers/instagram-insights.controller";
import { TotalStatisticController } from "./total-statistic.controller";
import { TiktokController } from "./tiktok.controller";
import { QuoteController } from "./quote.controller";
import { TiktokBusinessController } from "./tiktok-buisness.controller";

@Module({
  imports: [
    ServiceModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    RepositoryModule,
    ServiceModule,
  ],
  controllers: [
    AuthController,
    InfluencerController,
    ManagerController,
    YoutubeController,
    FacebookController,
    InstagramInsightsController,
    TotalStatisticController,
    TiktokController,
    QuoteController,
    TiktokBusinessController
  ],
  providers: [JwtStrategy],
})
export class ControllerModule {}
