import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { UniResponseInterceptor } from "@unistory/nestjs-common";
import { LoggerService } from "@unistory/nestjs-logger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "src/modules/app.module";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { SeedService } from "src/services/seed.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const config: ProjectConfigService = app.get(ProjectConfigService);
  const { port } = config;

  const logger = app.get(LoggerService);
  app.useGlobalInterceptors(new UniResponseInterceptor(logger));

  // temporary assistant
  const seedService = app.get(SeedService);
  await seedService.run();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  try {
    const swaggerConfig = config.swaggerConfigModel;
    const docsConfig = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addTag(swaggerConfig.tag)
      .setContact(swaggerConfig.name, swaggerConfig.site, swaggerConfig.email)
      .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" }, "access-token")

      .addTag("Auth", "Controller responsible for user authentication and authorization")
      .addTag("Influencer", "Controller processing operations with influencers (bloggers) and their platforms (social networks)")
      .addTag("facebook", "Controller processing operations by the controller with connecting facebook accounts of influencers")
      .addTag("instagram", "Controller processing operations by the controller with influencer's instagram statistics")
      .addTag("YouTube", "Controller processing operations by the controller with with connecting youtube accounts of influencers and getting their statistics")
      .addTag("tiktok", "Controller processing operations by the controller with with connecting tiktok accounts of influencers and getting their basic statistics")
      .addTag("tiktok-business", "Controller processing operations by the controller with connecting tiktok accounts of influencers and getting their extended statistics")
      .addTag("total-statistic", "Controller processing operations by the controller with getting general statistics for all platforms for all users")
      .addTag("Manager", "Controller processing operations with the manager")
      .addTag("quote", "Controller processing operations with the influencer's quote")
      
      .build();

    const docs = SwaggerModule.createDocument(app, docsConfig);
    SwaggerModule.setup("api/swagger", app, docs);
  } catch (error) {
    console.log(error);
  }

  app.enableCors();

  await app.listen(port);
}

bootstrap().then((r) => {
  console.log("Success bootstrap");
});
