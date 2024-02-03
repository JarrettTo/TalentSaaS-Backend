import { HttpService } from "@nestjs/axios";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import TikAPI from "tikapi";
import { URL } from "url";
import * as fs from "fs";

import { TiktokCountryInsightEntity } from "./../DAL/entities/tiktok/tiktok.country.insight.entity";
import { TiktokCountryInsightRepository } from "./../DAL/repositories/tiktok/tiktok.country.insight.repository";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { InfluencerService } from "src/services/influencer.service";
import { TiktokAuthDto } from "src/dto/tiktok/tiktok.auth.dto";
import { TiktokTokenRepository } from "src/DAL/repositories/tiktok-token.repository";
import { TiktokTokenEntity } from "src/DAL/entities/tiktok-token.entity";
import { TiktokAllStatisticsResponseDto } from "src/dto/tiktok/response/tiktok.all.statistics.response.dto";
import { TiktokInsightsRepository } from "src/DAL/repositories/tiktok/tiktok.insights.repository";
import { Mapper } from "@automapper/core";
import { TiktokInsightsEntity } from "src/DAL/entities/tiktok/tiktok.insights.entity";
import { TiktokGenderResponseDto } from "src/dto/tiktok/response/tiktok.gender.response.dto";
import { TikapiGenderResponseDto } from "src/dto/tiktok/tikapi/tikapi.gender.reponse";
import { TikapiCountryResponseDto } from "src/dto/tiktok/tikapi/tikapi.country.reponse";
import { TiktokCountryResponseDto } from "src/dto/tiktok/response/tiktok.country.response.dto";
import { DateHelper } from "src/infrastructure/utils/date.helper";
import { TiktokGenderInsightEntity } from "src/DAL/entities/tiktok/tiktok.gender.insight.entity";
import { TiktokGenderInsightRepository } from "src/DAL/repositories/tiktok/tiktok.gender.insight.repository";
import { TikapiChannelResponseDto } from "src/dto/tiktok/tikapi/tikapi.channel.reponse";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { firstValueFrom } from "rxjs";
import { AxiosBaseResponse } from "src/responses/axios-base.response";
import { UniHttpException } from "@unistory/nestjs-common";
import { TiktokAuthResponseDto, TiktokBusinessAuthResponseDto } from "src/dto/tiktok/response/tiktok.auth.response.dto";
import {
  TikTokBaseUserResponseDto,
  TikTokUserInfoResponseDto,
} from "src/dto/tiktok/response/tiktok.user-info.response.dto";
import { TikTokVideoStatisticResponseDto } from "src/dto/tiktok/response/tiktok.video-statisic.response.dto";
import { TikTokMainStatisticResponseDto } from "src/dto/tiktok/response/tiktok.main-statistic.response.dto";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { TikTokBaseResponseDto } from "src/dto/tiktok/response/tiktok.base-statistic.response.dto";
import { FileService } from "./file.service";
import { UrlShorterService } from "./url-shortter.service";
import { TiktokLogInsightsRepository } from "src/DAL/repositories/tiktok/tiktok-log.insights.repository";
import { TiktokLogInsightsEntity } from "src/DAL/entities/tiktok/log/tiktok-log.insights.entity";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { TikTokLogStatisticResponseDto } from "src/dto/tiktok/response/tiktok.log-statistic.response.dto";
import { url } from "inspector";
import { TiktokBusinessTokenRepository } from "src/DAL/repositories/tiktok-business-token.repository";
import { TiktokBusinessTokenEntity } from "src/DAL/entities/tiktok-business-token.entity";
import { TiktokBusinessBaseResponseDto } from "src/dto/tiktok/response/buisiness/TiktokBusinessBaseResponseDto";
import {
  TiktokBusinessBaseInsightResponseDto,
  TiktokBusinessInsightResponseDto,
} from "src/dto/tiktok/response/buisiness/tiktok-business.insight.response.dto";
import { TiktokAgeInsightEntity } from "src/DAL/entities/tiktok/tiktok.age.insight.entity";
import { TiktokLogGenderInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.gender.insight.entity";
import { TiktokLogAgeInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.age.insight.entity";
import { TiktokLogCountryInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.country.insight.entity";
import { TiktokAgeInsightRepository } from "src/DAL/repositories/tiktok/tiktok.age.insight.repository";
import { TIkTokBusinessCountryInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.country.response.dto";
import { TiktokBusinessPermissionsBaseResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-business.permissions.response.dto";
import {
  TiktokBusinessAccountInfoResponseDto,
  TiktokBusinessBaseAccountInfoResponseDto,
} from "src/dto/tiktok/response/buisiness/tiktok-business.account-info.response.dto";
import { TIkTokBusinessAgeInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.age.response.dto";
import { TIkTokBusinessGenderInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.gender.response.dto copy";
import { TiktokAgeResponseDto } from "src/dto/tiktok/response/tiktok.age.response.dto";
import { TiktokDeviceInsightEntity } from "src/DAL/entities/tiktok/tiktok.device.insight.entity";
import { TiktokLogDeviceInsightEntity } from "src/DAL/entities/tiktok/log/tiktok-log.device.insight.entity";
import { TiktokDeviceInsightRepository } from "src/DAL/repositories/tiktok/tiktok.device.insight.repository";
import { TIkTokBusinessDeviceInsightResponseDto } from "src/dto/tiktok/response/buisiness/tiktok-insight.device.response.dto";

@Injectable()
export class TiktokBusinessService {
  private readonly _tiktokAuthUrl: string =`https://open-api.tiktok.com/platform/oauth/connect`
  private readonly _tikTokBaseUrl: string = " https://business-api.tiktok.com/open_api/v1.3/";
  private readonly _tikTokAuthPath: string = "tt_user/oauth2/token/";
  private readonly _tikTokAuthRefreshPath: string = "/tt_user/oauth2/refresh_token/";
  private readonly _tikTokPermissionsPath: string = "tt_user/token_info/get/";
  private readonly _tikTokInsightsPath: string = "business/get/";
  private readonly _tikTokTCMInsightsPath: string = "tcm/creator/authorized/";
  private readonly _scopes: string[] = [
    "user.info.basic",
    "user.insights",
    "user.info.stats",
    "tcm.order.update",
    "video.insights",
    "video.publish",
    "biz.creator.insights",
    "biz.creator.info",
    "video.list",
    "user.info.username",
    "comment.list.manage",
    "user.account.type",
    "comment.list"
].sort();

  private readonly _logger = new Logger();
  constructor(
    private readonly _configService: ProjectConfigService,
    private readonly _influencerService: InfluencerService,

    private readonly _influencerRepo: InfluencerRepository,
    private readonly _managerRepo: ManagerRepository,
    private readonly _tiktokTokenRepo: TiktokTokenRepository,
    private readonly _tiktokBusinessTokenRepo: TiktokBusinessTokenRepository,

    private readonly _tiktokInsightsRepo: TiktokInsightsRepository,
    private readonly _tiktokAgeInsightRepo: TiktokAgeInsightRepository,
    private readonly _tiktokCountryInsightRepo: TiktokCountryInsightRepository,
    private readonly _tiktokGenderInsightRepo: TiktokGenderInsightRepository,
    private readonly _tiktokDeviceInsightRepo: TiktokDeviceInsightRepository,

    private readonly _tiktokLogInsightRepo: TiktokLogInsightsRepository,

    private readonly _urlShorterService: UrlShorterService,

    private readonly _httpService: HttpService,
    private readonly _fileService: FileService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  public async getTokens(influencerId: number): Promise<TiktokBusinessTokenEntity> {
    return await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);
  }
  public async generateAuthEmailLink(influencerId: number): Promise<string> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);

    const authUrl = new URL(this._configService.tikTokAuthCodeUrl);
    authUrl.searchParams.append("state", `${influencer.id}`);

    const longUrl = authUrl.toString()

    return await this._urlShorterService.generateShortLink(longUrl);
  }
  public async signIn(dto: TiktokAuthDto, influencerId: number): Promise<void> {
    const dtoSortedScopes = dto.scopes.sort();
    const influencer = await this._influencerService.getOneOrFail(influencerId);
    

    const tokens = await this.getTokensByCode(dto.code);

    const newBusinessToken = new TiktokBusinessTokenEntity();

    newBusinessToken.accessToken = tokens.accessToken;
    newBusinessToken.refreshToken = tokens.refreshToken;
    newBusinessToken.openId = tokens.openId;

    const info = await this.getTCMAccountInfo(newBusinessToken.accessToken, newBusinessToken.openId);





    if (influencer == null) {
      console.log("RAISE NOT FOUND WITH SAME NAME");
      throw new UniHttpException(`can't find influencer with tiktok profile: ${info.displayName}`);
    }

    const localBusinessTiktokToken = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencer.id);
    const insight = await this._tiktokInsightsRepo.getByInfluencerId(influencer.id);

    if (localBusinessTiktokToken != null) {
      localBusinessTiktokToken.accessToken = newBusinessToken.accessToken;
      localBusinessTiktokToken.refreshToken = newBusinessToken.refreshToken;
      localBusinessTiktokToken.openId = newBusinessToken.openId;

      await this._tiktokBusinessTokenRepo.save(localBusinessTiktokToken);
    } else {
      newBusinessToken.influencer = influencer;
      await this._tiktokBusinessTokenRepo.save(newBusinessToken);
    }
    

    if (insight == null) {
      const localInsight = new TiktokInsightsEntity();
      localInsight.influencer = influencer;
      localInsight.date = DateHelper.getYesterday();
      await this._tiktokInsightsRepo.save(localInsight);
    }
    await this.updateLocalDbStatistic(influencer.id);
  }

  private async getTokensByCode(code: string): Promise<TiktokAuthResponseDto> {
    const decodedCode = decodeURIComponent(code);
    const url = new URL(this._tikTokBaseUrl + this._tikTokAuthPath);
    console.log("url", url.toString());
    const body = {
      grant_type: "authorization_code",
      auth_code: decodedCode,
      client_secret: this._configService.tikTokBusinessClientSecret,
      client_id: this._configService.tikTokBusinessClientId,
      redirect_uri: "",
    };

    const result = await this.sendPostRequestNoToken(url.toString(), TiktokBusinessAuthResponseDto, body);
    console.log("result", result);

    if (result.code == 40131) {
      throw new UniHttpException("Authorization code is expired");
    }
    return result.data;
  }
  private encodeQueryParams =(params)=> {
    const encodedParams = [];
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        encodedParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
    }
    return encodedParams.join('&');
  }
  public async getCreatorId(accessToken: string): Promise<string> {
    const url = new URL(this._tikTokBaseUrl + this._tikTokPermissionsPath);

    const result = await this.sendPostRequest(
      url.toString(),
      TiktokBusinessPermissionsBaseResponseDto,
      null,
      accessToken,
    );
    return result.data.creatorId;
  }

  public async getBusinessInsights(
    influencerId: number,
    from: string = DateHelper.get60DaysAgo().toISOString().split("T")[0],
    to: string = DateHelper.getYesterday().toISOString().split("T")[0],
  ): Promise<TiktokBusinessBaseInsightResponseDto> {
    await this.refreshToken(influencerId);
    const tokens = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);

    const url = new URL(this._tikTokBaseUrl + this._tikTokInsightsPath);

    url.searchParams.append("business_id", tokens.openId);
    url.searchParams.append("start_date", from);
    url.searchParams.append("end_date", to);

    url.searchParams.append(
      "fields",
      `["audience_countries", "audience_genders", "likes", "comments", "shares", "followers_count", "video_views"]`,
    );

    const response = await this.sendGetRequest(url.toString(), TiktokBusinessInsightResponseDto, tokens.accessToken);
    return response.data;
  }

  public async getBusinessCreatorAuthorizedInsights(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
  ): Promise<TiktokBusinessBaseInsightResponseDto> {
    const tokens = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);

    const url = new URL("https://business-api.tiktok.com/open_api/v1.3/tcm/creator/authorized/");

    url.searchParams.append("creator_id", tokens.openId);

    url.searchParams.append("fields", `["audience_countries", "audience_genders","audience_ages", "audience_device"]`);

    const response = await this.sendGetRequest(url.toString(), TiktokBusinessInsightResponseDto, tokens.accessToken);
    console.log("getBusinessCreatorAuthorizedInsights response", response);

    return response.data;
  }
  public async getTCMCreatorAuthorizedInsights(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
  ): Promise<TiktokBusinessBaseInsightResponseDto> {
    const tokens = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);

    const url = new URL("https://business-api.tiktok.com/open_api/v1.3/tcm/creator/authorized/");

    url.searchParams.append("creator_id", tokens.openId);

    url.searchParams.append("fields", `["audience_countries", "audience_genders","audience_ages", "audience_device"]`);

    const response = await this.sendGetRequest(url.toString(), TiktokBusinessInsightResponseDto, tokens.accessToken);
    console.log("getBusinessCreatorAuthorizedInsights response", response);

    return response.data;
  }

  public async getBusinessAccountInfo(
    accessToken: string,
    openId: string,
  ): Promise<TiktokBusinessBaseAccountInfoResponseDto> {
    const url = new URL(this._tikTokBaseUrl + this._tikTokInsightsPath);
    url.searchParams.append("business_id", openId);

    url.searchParams.append("fields", `["display_name", "username"]`);
    console.log("MMMMM URL TO STRING", url.toString());

    const response = await this.sendGetRequest(url.toString(), TiktokBusinessAccountInfoResponseDto, accessToken);
    return response.data;
  }
  public async getTCMAccountInfo(
    accessToken: string,
    openId: string,
  ): Promise<TiktokBusinessBaseAccountInfoResponseDto> {
    const url = new URL(this._tikTokBaseUrl + this._tikTokTCMInsightsPath);
    url.searchParams.append("creator_id", openId);

    url.searchParams.append("fields", `["display_name", "username"]`);
    console.log("MMMMM URL TO STRING", url.toString());

    const response = await this.sendGetRequest(url.toString(), TiktokBusinessAccountInfoResponseDto, accessToken);
    return response.data;
  }
  public async getAllLocalStatistics(influencerId: number): Promise<TiktokAllStatisticsResponseDto> {
    const statistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);
    return this._mapper.map(statistic, TiktokInsightsEntity, TiktokAllStatisticsResponseDto);
  }

  public async getAllLogStatistics(influencerId: number): Promise<TikTokLogStatisticResponseDto[]> {
    const logStatistic = await this._tiktokLogInsightRepo.getAllFullWithManagerByInfluencerId(influencerId);
    return this._mapper.mapArray(logStatistic, TiktokLogInsightsEntity, TikTokLogStatisticResponseDto);
  }

  public async updateLogStatistic(influencerId: number, managerId?: number): Promise<void> {
    let newLogStatistic = await this._tiktokLogInsightRepo.getByInfluencerId(influencerId);

    if (newLogStatistic == null) {
      newLogStatistic = new TiktokLogInsightsEntity();
    }
    const localStatistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);
    const influencer = await this._influencerRepo.getById(influencerId);

    if (managerId != null) {
      const manager = await this._managerRepo.getById(managerId);
      newLogStatistic.manager = manager;
    }

    newLogStatistic.ages = this._mapper.mapArray(
      localStatistic.ages,
      TiktokAgeInsightEntity,
      TiktokLogAgeInsightEntity,
    );
    newLogStatistic.countries = this._mapper.mapArray(
      localStatistic.countries,
      TiktokCountryInsightEntity,
      TiktokLogCountryInsightEntity,
    );

    newLogStatistic.devices = this._mapper.mapArray(
      localStatistic.devices,
      TiktokDeviceInsightEntity,
      TiktokLogDeviceInsightEntity,
    );

    if (newLogStatistic.genders == null) {
      newLogStatistic.genders = new TiktokLogGenderInsightEntity();
    }
    newLogStatistic.genders.femaleCount = localStatistic.genders.femaleCount;
    newLogStatistic.genders.maleCount = localStatistic.genders.maleCount;
    newLogStatistic.genders.otherCount = localStatistic.genders.otherCount;

    await this._tiktokLogInsightRepo.save(newLogStatistic);
  }

  public async updateLocalDbStatistic(influencerId: number): Promise<void> {
    const statistic = await this.getBusinessCreatorAuthorizedInsights(influencerId);
    const localStatistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);
    console.log("statistic", statistic);
    console.log("localStatistic", localStatistic);

    if (localStatistic.countries == null || localStatistic.countries.length == 0) {
      await this._tiktokCountryInsightRepo.removeAllByIds(localStatistic.countries.map((el) => el.id));
    }
    const localCountries: TiktokCountryInsightEntity[] = [];
    localStatistic.countries = localCountries;

    if (localStatistic.ages == null || localStatistic.ages.length == 0) {
      await this._tiktokAgeInsightRepo.removeAllByIds(localStatistic.ages.map((el) => el.id));
    }
    const localAges: TiktokAgeInsightEntity[] = [];
    localStatistic.ages = localAges;

    if (localStatistic.devices == null || localStatistic.ages.length == 0) {
      await this._tiktokDeviceInsightRepo.removeAllByIds(localStatistic.devices.map((el) => el.id));
    }
    const localDevices: TiktokDeviceInsightEntity[] = [];
    localStatistic.devices = localDevices;

    // localStatistic.engagement = statistic.engagementRate;

    localStatistic.countries = this._mapper.mapArray(
      statistic.audienceCountries,
      TIkTokBusinessCountryInsightResponseDto,
      TiktokCountryInsightEntity,
    );
    localStatistic.ages = this._mapper.mapArray(
      statistic.audienceAges,
      TIkTokBusinessAgeInsightResponseDto,
      TiktokAgeInsightEntity,
    );

    localStatistic.devices = this._mapper.mapArray(
      statistic.audienceDevice,
      TIkTokBusinessDeviceInsightResponseDto,
      TiktokDeviceInsightEntity,
    );

    if (localStatistic.genders == null) {
      localStatistic.genders = new TiktokGenderInsightEntity();
    }

    localStatistic.genders.femaleCount = statistic.audienceGenders.find((el) => el.gender == "Female")?.percentage;
    localStatistic.genders.maleCount = statistic.audienceGenders.find((el) => el.gender == "Male")?.percentage;
    localStatistic.genders.otherCount = statistic.audienceGenders.find((el) => el.gender == "Other")?.percentage;

    await localStatistic.save();
  }

  public async refreshToken(influencerId: number): Promise<void> {
    const localToken = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);
    const url = new URL(this._tikTokBaseUrl + this._tikTokAuthRefreshPath);

    const body = {
      client_id: this._configService.tikTokBusinessClientId,
      refresh_token: localToken.refreshToken,
      client_secret: this._configService.tikTokBusinessClientSecret,
      grant_type: "refresh_token",
    };
    try {
      const tokens = await this.sendPostRequest(url.toString(), TiktokBusinessAuthResponseDto, body);

      localToken.accessToken = tokens.data.accessToken;
      localToken.refreshToken = tokens.data.refreshToken;
      await this._tiktokBusinessTokenRepo.save(localToken);
    } catch (error) {
      console.log("error", error);
      throw new Error(`unknown error when refresh token: ${error}}`);
    }
  }
  private async sendPostRequestNoToken<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    body: any,
   
  ): Promise<TResponse> {
    try {
      console.log("BODY:", body)
      const rawRes = await firstValueFrom<AxiosBaseResponse<TResponse>>(
        this._httpService.post(uri, body, {
          headers: {
            "Content-Type": "application/json"
          },
        }),
      );
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      console.log("THIS IS AN ERROR PLEASE CHECK ME NOW", e);

      throw new UniHttpException("TikTok post error", e);
    }
  }
  private async sendPostRequest<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    body: any,
    accessToken?: string,
  ): Promise<TResponse> {
    try {
      console.log("BODY:", body)
      const rawRes = await firstValueFrom<AxiosBaseResponse<TResponse>>(
        this._httpService.post(uri, body, {
          headers: {
            "Content-Type": "application/json",
            "Access-Token ": `${accessToken}`,
          },
        }),
      );
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      console.log("THIS IS AN ERROR PLEASE CHECK ME NOW", e);

      throw new UniHttpException("TikTok post error", e);
    }
  }
  private async sendGetRequest<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    accessToken?: string,
  ): Promise<TResponse> {
    console.log("sendGetRequest.accessToken=", accessToken);

    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<TResponse>>(
        this._httpService.get(uri, {
          headers: {
            "Content-Type": "application/json",
            "Access-Token ": `${accessToken}`,
          },
        }),
      );
      console.log("rawRes", rawRes);
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      console.log("e", e);

      throw new UniHttpException("TikTok post error", e);
    }
  }
}
