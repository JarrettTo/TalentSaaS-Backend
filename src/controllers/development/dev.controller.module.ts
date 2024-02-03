import { PassportModule } from "@nestjs/passport";

import { Module } from "@nestjs/common";
import { ServiceModule } from "src/services/service.module";
import { RepositoryModule } from "src/DAL/repositories/repository.module";
import { JwtStrategy } from "src/services/jwt.strategy";
import { DevFacebookController } from "src/controllers/development/dev.facebook.controller";
import { DevInfluencerController } from "src/controllers/development/dev.influencer.controller";
import { DevYoutubeController } from "src/controllers/development/dev.youtube.controller";
import { DevInstagramInsightsController } from "./dev.instagram-insights.controller";
import { DevTikTokController } from "./dev.tiktok.controller";

@Module({
  imports: [
    ServiceModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    RepositoryModule,
    ServiceModule,
  ],
  controllers: [DevInfluencerController, DevYoutubeController, DevFacebookController, DevInstagramInsightsController, DevTikTokController],
  providers: [JwtStrategy],
})
export class DevControllerModule {}
