import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ElasticSearchConfiguration } from "@unistory/nestjs-logger";

import { options as typeormConfig } from "src/DAL/typeorm.config";
import { SwaggerConfigModel } from "src/models/swagger-config.model";
import { FacebookCfg } from "src/infrastructure/config/data/facebook.cfg";

@Injectable()
export class ProjectConfigService {
  constructor(private _configService: ConfigService) {}

  get port(): number {
    return +this._configService.get<string>("APP_PORT");
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return typeormConfig;
  }

  get elasticSearchConfig(): ElasticSearchConfiguration {
    const elasticSearchEnabledValue = Number(this._configService.get<string>("ELASTIC_SEARCH_ENABLED"));
    const elasticSearchEnabled = Boolean(elasticSearchEnabledValue);

    if (!elasticSearchEnabled) {
      return null;
    }

    const config = new ElasticSearchConfiguration();

    config.baseUrl = this._configService.get<string>("ELASTIC_SEARCH_BASE_URL");
    config.apiKey = this._configService.get<string>("ELASTIC_SEARCH_APIKEY");
    config.indexTemplate = this._configService.get<string>("ELASTIC_SEARCH_INDEX_TEMPLATE");

    return config;
  }

  get swaggerConfigModel(): SwaggerConfigModel {
    return {
      title: this._configService.get<string>("SW_TITLE"),
      description: this._configService.get<string>("SW_DESCRIPTION"),
      version: this._configService.get<string>("SW_VERSION"),
      tag: this._configService.get<string>("SW_TAG"),
      name: this._configService.get<string>("SW_CONTACT_NAME"),
      site: this._configService.get<string>("SW_CONTACT_SITE"),
      email: this._configService.get<string>("SW_CONTACT_EMAIL"),
    };
  }

  get accessTokenSecret(): string {
    return this._configService.get<string>("ACCESS_TOKEN_SECRET");
  }

  get accessTokenExpirationTime(): number {
    return Number(this._configService.get<number>("ACCESS_TOKEN_EXPIRATION_TIME"));
  }

  get refreshTokenExpirationTime(): number {
    return Number(this._configService.get<number>("REFRESH_TOKEN_EXPIRATION_TIME"));
  }

  get noReplyEmail(): string {
    return this._configService.get<string>("NO_REPLY_EMAIL");
  }
  get noReplyEmailPassword(): string {
    return this._configService.get<string>("NO_REPLY_EMAIL_PASSWORD");
  }

  get frontendUrl(): string {
    return this._configService.get<string>("FRONTEND_URL");
  }

  get frontendConfirmEmailPageRoute(): string {
    return this._configService.get<string>("FRONTEND_CONFIRM_EMAIL_PAGE_ROUTE");
  }

  get frontendResetPasswordPageRoute(): string {
    return this._configService.get<string>("FRONTEND_RESET_PASSWORD_PAGE_ROUTE");
  }

  get avatarFilesPath(): string {
    return this._configService.get<string>("AVATAR_FILES_PATH");
  }

  get structuredDataFilesPath(): string {
    return this._configService.get<string>("STRUCTURED_DATA_FILES_PATH");
  }

  get testEmail(): string {
    return this._configService.get<string>("TEST_EMAIL");
  }

  get testPassword(): string {
    return this._configService.get<string>("TEST_PASSWORD");
  }

  get googleClientId(): string {
    return this._configService.get<string>("GOOGLE_CLIENT_ID");
  }

  get googleClientSecret(): string {
    return this._configService.get<string>("GOOGLE_CLIENT_SECRET");
  }

  get googleRedirectUrl(): string {
    return this._configService.get<string>("GOOGLE_CLIENT_REDIRECT_URL");
  }
  get youtubeAccountStartTime(): string {
    return this._configService.get<string>("YOUTUBE_ACCOUNT_START_TIME");
  }
  get youtubeAccountEndTime(): string {
    return this._configService.get<string>("YOUTUBE_ACCOUNT_END_TIME");
  }

  public get facebookCfg(): FacebookCfg {
    return new FacebookCfg(
      this._configService.get("FB_CLIENT_ID"),
      this._configService.get("FB_CLIENT_SECRET"),
      this._configService.get("FB_REDIRECT_URL"),
    );
  }
  get facebookTimeoutInSec(): number {
    return Number(this._configService.get<number>("FB_TIMEOUT_IN_SEC"));
  }

  get tikapiApiKey(): string {
    return this._configService.get<string>("TIKAPI_API_KEY");
  }

  get tikapiClientID(): string {
    return this._configService.get<string>("TIKAPI_CLIENT_ID");
  }

  get tikapiRedirectUrl(): string {
    return this._configService.get<string>("TIKAPI_REDIRECT_URL");
  }

  get tikTokClientKey(): string {
    return this._configService.get<string>("TIKTOK_CLIENT_KEY");
  }
  get tikTokClientSecret(): string {
    return this._configService.get<string>("TIKTOK_CLIENT_SECRET");
  }
  get tikTokRedirectUrl(): string {
    return this._configService.get<string>("TIKTOK_REDIRECT_URL");
  }
  get tikTokAuthCodeUrl(): string {
    return this._configService.get<string>("TIKTOK_AUTH_CODE_URL");
  }
  get platformCount(): number {
    return +this._configService.get<number>("PLATFORM_COUNT");
  }

  get influencerVerifyTokenLifeTime(): number {
    return +this._configService.get<number>("INFLUENCER_VERIFY_TOKEN_LIFE_TIME_IN_DAYS");
  }

  get quoteVerifyTokenLifeTime(): number {
    return +this._configService.get<number>("QUOTE_VERIFY_TOKEN_LIFE_TIME_IN_DAYS");
  }

  get cuttlyApiKey(): string {
    return this._configService.get<string>("CUTTLY_API_KEY");
  }

  get tikTokBusinessClientId(): string {
    return this._configService.get<string>("TIKTOK_BUSINESS_CLIENT_ID");
  }
  get tikTokBusinessClientSecret(): string {
    return this._configService.get<string>("TIKTOK_BUSINESS_CLIENT_SECRET");
  }
  get tikTokBusinessRedirectUrl(): string {
    return this._configService.get<string>("TIKTOK_BUSINESS_REDIRECT_URL");
  }
}
