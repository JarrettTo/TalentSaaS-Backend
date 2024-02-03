import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ProjectConfigService } from "src/infrastructure/config/config.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  providers: [ProjectConfigService],
  exports: [ProjectConfigService],
})
export class ApiConfigModule {}
