import { DevYoutubeController } from "src/controllers/development/dev.youtube.controller";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "@unistory/nestjs-logger";
import * as httpContext from "express-http-context";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { ApiConfigModule } from "src/modules/config.module";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { ControllerModule } from "src/controllers/controller.module";
import { DevControllerModule } from "src/controllers/development/dev.controller.module";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ProjectConfigService) => configService.elasticSearchConfig,
      inject: [ProjectConfigService],
    }),
    ApiConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ProjectConfigService) => configService.postgresConfig,
      inject: [ProjectConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../public"),
    }),
    ControllerModule,
    DevControllerModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(httpContext.middleware).forRoutes("*");
  }
}
