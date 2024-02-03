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
import { TiktokAuthResponseDto } from "src/dto/tiktok/response/tiktok.auth.response.dto";
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
import { TikTokeVideoListResponseDto } from "src/dto/tiktok/response/tiktok.video-list.response.dto";
import {
  TikTokBaseVideoResponseDto,
  TikTokVideosResponseDto,
} from "src/dto/tiktok/response/tiktok.video.base-response.dto";
import { TikTokVideoResponseDto } from "src/dto/tiktok/response/tiktok.video.response.dto";
import { TiktokVideoEntity } from "src/DAL/entities/tiktok/tiktok.video.entity";
import { TiktokVideoRepository } from "src/DAL/repositories/tiktok-video.repository";
import { TiktokBusinessTokenRepository } from "src/DAL/repositories/tiktok-business-token.repository";
import { InfluencerStatisticVerifyTokenRepository } from "src/DAL/repositories/influencer.statistic-verify-token.repository";
import { TikTokProfilePictureResponseDto } from "src/dto/tiktok/response/tiktok.prof-pic.response.dto";

@Injectable()
export class TiktokService {
  private readonly _tikTokAuthUrl: string;
  private readonly _tikTokApiAuthTokenUrl: string;
  private readonly _tikTokApiUserInfoUrl: string;
  private readonly _tikTokApiVideoInfoUrl: string;
  private readonly _tikTokApiVideoQueryUrl: string;

  private readonly _grandAccessType: string;
  private readonly _grandRefreshType: string;
  private readonly _scopes: string[];

  private readonly _tikApiClient;
  private readonly _logger = new Logger();
  constructor(
    private readonly _configService: ProjectConfigService,
    private readonly _influencerService: InfluencerService,

    private readonly _influencerRepo: InfluencerRepository,
    private readonly _managerRepo: ManagerRepository,
    private readonly _tiktokTokenRepo: TiktokTokenRepository,
    private readonly _tiktokBusinessTokenRepo: TiktokBusinessTokenRepository,

    private readonly _tiktokVideoRepo: TiktokVideoRepository,

    private readonly _tiktokInsightsRepo: TiktokInsightsRepository,
    private readonly _tiktokCountryInsightRepo: TiktokCountryInsightRepository,
    private readonly _tiktokGenderInsightRepo: TiktokGenderInsightRepository,

    private readonly _tiktokLogInsightRepo: TiktokLogInsightsRepository,

    private readonly _statisticTokenRepository: InfluencerStatisticVerifyTokenRepository,

    private readonly _urlShorterService: UrlShorterService,

    private readonly _httpService: HttpService,
    private readonly _fileService: FileService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {
    this._tikTokAuthUrl = "https://www.tiktok.com/v2/auth/authorize/";
    this._tikTokApiAuthTokenUrl = "https://open.tiktokapis.com/v2/oauth/token/";
    this._tikTokApiUserInfoUrl = "https://open.tiktokapis.com/v2/user/info/";
    this._tikTokApiVideoInfoUrl = "https://open.tiktokapis.com/v2/video/list/";
    this._tikTokApiVideoQueryUrl = "https://open.tiktokapis.com/v2/video/query/";

    this._grandAccessType = "authorization_code";
    this._grandRefreshType = "refresh_token";
    this._scopes = ["user.info.basic", "user.info.profile", "user.info.stats", "video.list"].sort();

    this._tikApiClient = TikAPI(this._configService.tikapiApiKey);
  }
  public async generateAuthEmailLink(influencerId: number): Promise<string> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);

    const authUrl = new URL(this._tikTokAuthUrl);
    authUrl.searchParams.append("client_key", this._configService.tikTokClientKey);
    authUrl.searchParams.append("scope", this._scopes.toString());
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", this._configService.tikTokRedirectUrl);
    authUrl.searchParams.append("state", `${influencer.id}`);

    const longUrl = authUrl.toString();

    return await this._urlShorterService.generateShortLink(longUrl);
  }
  

  public async signIn(influencerId: number, dto: TiktokAuthDto): Promise<void> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);
    const dtoSortedScopes = dto.scopes.sort();

    if (dtoSortedScopes.length != this._scopes.length) {
      throw new BadRequestException("one or more rights were not granted or more rights were granted");
    }

    for (let i = 0; i < this._scopes.length; i++) {
      if (dtoSortedScopes[i].toLowerCase() != this._scopes[i].toLowerCase()) {
        throw new BadRequestException("one or more rights were not granted or more rights were granted");
      }
    }

    const localTiktokToken = await this._tiktokTokenRepo.getByInfluencerId(influencerId);
    const insight = await this._tiktokInsightsRepo.getByInfluencerId(influencerId);
    const tokens = await this.getTokensByCode(dto.code);

    if (localTiktokToken != null) {
      localTiktokToken.accessToken = tokens.accessToken;
      localTiktokToken.refreshToken = tokens.refreshToken;
      await this._tiktokTokenRepo.save(localTiktokToken);
    } else {
      const newTiktokToken = new TiktokTokenEntity();
      newTiktokToken.accessToken = tokens.accessToken;
      newTiktokToken.refreshToken = tokens.refreshToken;
      newTiktokToken.influencer = influencer;
      await this._tiktokTokenRepo.save(newTiktokToken);
    }

    if (insight == null) {
      const localInsight = new TiktokInsightsEntity();
      localInsight.influencer = influencer;
      localInsight.date = DateHelper.getYesterday();
      await this._tiktokInsightsRepo.save(localInsight);
    }
    await this.disconnectAccountAndFailIfConnected(influencerId);
    await this.updateInfluencerProfile(influencerId);
    await this.updateLocalDbStatistic(influencerId);
    await this.updateLocalVideoList(influencerId);
  }

  private async disconnectAccountAndFailIfConnected(influencerId: number): Promise<void> {
    const { displayName } = await this.getUserInfoStatistic(influencerId);
    const platforms = await this._influencerRepo.getAllPlatforms();

    if (platforms.tiktok.includes(displayName)) {
      await this.deleteToken(influencerId);
      throw new UniHttpException("account with display name " + displayName + " is already connected");
    }
  }

  private async updateInfluencerProfile(influencerId: number): Promise<void> {
    const influencer = await this._influencerRepo.getById(influencerId);
    const token = await this._tiktokTokenRepo.getByInfluencerId(influencerId);

    const { displayName, avatarUrl, username } = await this.getUserInfoStatistic(influencerId);
    influencer.tiktokProfile = displayName;

    influencer.avatar = influencer.avatar ? influencer.avatar : `${influencer.id}-tiktok-avatar.jpeg`;
    const newFilePath = `./public/${this._configService.avatarFilesPath}/${influencer.avatar}`;

    token.username = username;

    await this._tiktokTokenRepo.save(token);
    await this._fileService.downloadAndReWriteFile(avatarUrl, newFilePath);
    await this._influencerRepo.save(influencer);
  }
  public async refreshToken(influencerId: number): Promise<void> {
    const localToken = await this._tiktokTokenRepo.getByInfluencerId(influencerId);
    const url = new URL(this._tikTokApiAuthTokenUrl);

    const body = {
      client_key: this._configService.tikTokClientKey,
      client_secret: this._configService.tikTokClientSecret,
      grant_type: "refresh_token",
      refresh_token: localToken.refreshToken,
    };
    try {
      const tokens = await this.sendPostRequest(url.toString(), TiktokAuthResponseDto, body);
      localToken.accessToken = tokens.accessToken;
      localToken.refreshToken = tokens.refreshToken;
      await this._tiktokTokenRepo.save(localToken);
    } catch (error) {
      if (error.params[0].response.status == 401) {
        throw new BadRequestException("bad refresh token");
      }
      throw new Error(`unknown error when refresh token: ${error.params[0].response}`);
    }
  }
  public async getTokensByCode(code: string): Promise<TiktokAuthResponseDto> {
    const url = new URL(this._tikTokApiAuthTokenUrl);

    const body = {
      client_key: this._configService.tikTokClientKey,
      client_secret: this._configService.tikTokClientSecret,
      code: code,
      grant_type: this._grandAccessType,
      redirect_uri: this._configService.tikTokRedirectUrl,
    };
    const tokens = await this.sendPostRequest(url.toString(), TiktokAuthResponseDto, body);
    if (tokens?.["error"] == "invalid_grant") {
      throw new BadRequestException("invalid auth code");
    }
    return tokens;
  }
  
  public async getUserInfoStatistic(influencerId: number): Promise<TikTokBaseUserResponseDto> {
    const token = await this.getTokenOrFail(influencerId);
    const url = new URL(this._tikTokApiUserInfoUrl);
    url.searchParams.append("fields", "follower_count,likes_count,video_count, display_name, avatar_url_100, username");

    try {
      const baseStatistic = await this.sendGetStatisticRequest(
        url.toString(),
        TikTokUserInfoResponseDto,
        token.accessToken,
      );
      return {
        username: baseStatistic.user.username,
        followersCount: baseStatistic.user.followersCount,
        likesCount: baseStatistic.user.likesCount,
        videosCount: baseStatistic.user.videosCount,
        displayName: baseStatistic.user.displayName,
        avatarUrl: baseStatistic.user.avatarUrl,
      };
    } catch (error) {
      if (error.params[0].response.status == 401) {
        await this.refreshToken(influencerId);
        return await this.getUserInfoStatistic(influencerId);
      }
    }
  }

  public async getBaseStatistic(influencerId: number): Promise<TikTokMainStatisticResponseDto> {
    const userInfo = await this.getUserInfoStatistic(influencerId);

    return {
      followersCount: userInfo.followersCount,
      likesCount: userInfo.likesCount,
      videosCount: userInfo.videosCount,
    };
  }
  public async getProfilePicture(influencerId: number): Promise<TikTokProfilePictureResponseDto> {
    const userInfo = await this.getUserInfoStatistic(influencerId);

    return {
      avatarUrl: userInfo.avatarUrl
    };
  }
  public async getBaseLocalStatistic(influencerId: number): Promise<TiktokAllStatisticsResponseDto> {
    const localStatistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);
    return this._mapper.map(localStatistic, TiktokInsightsEntity, TiktokAllStatisticsResponseDto);
  }

  public async getBaseLogStatistic(influencerId: number): Promise<TikTokLogStatisticResponseDto[]> {
    const localLogStatistic = await this._tiktokLogInsightRepo.getAllFullWithManagerByInfluencerId(influencerId);
    console.log("local log statistic", localLogStatistic);

    return this._mapper.mapArray(localLogStatistic, TiktokLogInsightsEntity, TikTokLogStatisticResponseDto);
  }

  public async updateLocalDbStatistic(influencerId: number): Promise<void> {
    let localStatistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);

    if (localStatistic == null) {
      localStatistic = new TiktokInsightsEntity();
      localStatistic.influencer = await this._influencerService.getOneOrFail(influencerId);
    }

    const statistic = await this.getBaseStatistic(influencerId);

    const videos = await this._tiktokVideoRepo.getAllByInfluencerIdDate(influencerId);
    localStatistic.videosCount = statistic.videosCount;
    localStatistic.likesCount = statistic.likesCount;
    localStatistic.followersCount = statistic.followersCount;

    const totalViews = videos.reduce((accumulator, el) => accumulator + el.views, 0);

    if (videos != null && videos.length > 0) {
      localStatistic.viewsAverage = +(totalViews / videos.length).toFixed(0);
    }
    await this._tiktokInsightsRepo.save(localStatistic);
  }

  public async updateLogStatistic(influencerId: number, managerId?: number): Promise<void> {
    await this._tiktokLogInsightRepo.removeAllByInfluencerId(influencerId);

    const localStatistic = await this._tiktokInsightsRepo.getFullByInfluencerId(influencerId);
    if (localStatistic == null) {
      return;
    }

    const influencer = await this._influencerRepo.getById(influencerId);

    const newLogStatistic = new TiktokLogInsightsEntity();
    newLogStatistic.influencer = influencer;

    if (managerId != null) {
      const manager = await this._managerRepo.getById(managerId);
      newLogStatistic.manager = manager;
    }

    newLogStatistic.videosCount = localStatistic.videosCount;
    newLogStatistic.likesCount = localStatistic.likesCount;
    newLogStatistic.followersCount = localStatistic.followersCount;
    newLogStatistic.viewsAverage = localStatistic.viewsAverage;

    await this._tiktokLogInsightRepo.save(newLogStatistic);
  }

  public async getChannelName(influencerId: number): Promise<string> {
    const userInfo = await this.getUserInfoStatistic(influencerId);
    return userInfo.displayName;
  }
  public async getChannelImage(influencerId: number): Promise<string> {
    const userInfo = await this.getUserInfoStatistic(influencerId);
    const url = userInfo.avatarUrl;

    const res = await fetch(url, { method: "GET" });
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const newFilePath = `./public/${this._configService.avatarFilesPath}/${"image.jpeg"}`;
    fs.writeFile(newFilePath, buffer, () => console.log("video saved!"));
    return "";
  }
  public async downloadFile(url, fileFullPath) {
    const res = await fetch(url, { method: "GET" });
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFile("image.png", buffer, () => console.log("video saved!"));
  }
  public async getTopVideosStatistic(
    influencerId: number,
    count: number = 10,
  ): Promise<TikTokVideoStatisticResponseDto> {
    try {
      const videos = await this.getLatestVideosStatistic(influencerId, count);
      return this.calculateVideoStatistic(videos);
    } catch (error) {
      if (error.params[0].response.status == 401) {
        await this.refreshToken(influencerId);
        return await this.getTopVideosStatistic(influencerId, count);
      } else {
        throw new Error(`unknown error (getTopVideosStatistic): ${error.params[0].response}`);
      }
    }
  }

  public async getLatestVideosStatistic(
    influencerId: number,
    count: number = 10,
  ): Promise<TikTokBaseVideoResponseDto[]> {
    const token = await this.getTokenOrFail(influencerId);
    const url = new URL(this._tikTokApiVideoInfoUrl);
    url.searchParams.append("fields", "view_count,like_count,comment_count,share_count");
    const body = { max_count: count };
    const videos = await this.sendPostStatisticRequest(
      url.toString(),
      TikTokVideosResponseDto,
      body,
      token.accessToken,
    );

    return videos.videos;
  }

  public async getVideoStatistic(influencerId: number, videoId: string): Promise<TikTokBaseVideoResponseDto> {
    const token = await this.getTokenOrFail(influencerId);
    const url = new URL(this._tikTokApiVideoQueryUrl);
    url.searchParams.append("fields", "view_count,like_count,comment_count,share_count");
    const body = { filters: { video_ids: [videoId] } };
    const videos = await this.sendPostStatisticRequest(
      url.toString(),
      TikTokVideosResponseDto,
      body,
      token.accessToken,
    );

    if (videos.videos.length == 0) {
      throw new NotFoundException(`video with id ${videoId} not found`);
    }
    return videos.videos[0];
  }

  public async updateLocalVideoList(influencerId: number): Promise<void> {
    const token = await this.getTokenOrFail(influencerId);
    const influencer = await this._influencerService.getOneOrFail(influencerId);
    const lastLocalVideo = await this._tiktokVideoRepo.getLastByInfluencerId(influencerId);

    const videos: TikTokBaseVideoResponseDto[] = [];
    let videosIteration = await this.getVideos(token.accessToken);

    if (lastLocalVideo == null) {
      videos.push(...videosIteration.videos);
      while (videosIteration.cursor != null && videosIteration.cursor != 0) {
        videosIteration = await this.getVideos(token.accessToken, videosIteration.cursor);
        videos.push(...videosIteration.videos);
      }
    } else {
      const lastPublishedAtSec = lastLocalVideo.publishedAt.getTime() / 1000;
      for (const video of videosIteration.videos) {
        if (video.createTime > lastPublishedAtSec) {
          videos.push(...videosIteration.videos);
        } else {
          break;
        }
      }
      let flag = true;
      while (videosIteration.cursor != null && videosIteration.cursor != 0) {
        if (!flag) {
          break;
        }
        videosIteration = await this.getVideos(token.accessToken, videosIteration.cursor);
        for (const video of videosIteration.videos) {
          if (video.createTime > lastPublishedAtSec) {
            videos.push(...videosIteration.videos);
          } else {
            flag = false;
            break;
          }
        }
      }
    }
    const videoEntities: TiktokVideoEntity[] = [];
    for (const video of videos) {
      const localVideo = new TiktokVideoEntity();

      localVideo.title = video.title;
      localVideo.description = video.videoDescription;
      localVideo.tiktokId = video.id;

      localVideo.comments = video.commentsCount;
      localVideo.likes = video.likesCount;
      localVideo.views = video.viewsCount;
      localVideo.publishedAt = DateHelper.secToDateTime(video.createTime);

      localVideo.influencer = influencer;

      videoEntities.push(localVideo);
    }

    await this._tiktokVideoRepo.saveRange(videoEntities);
  }

  private async getVideos(token: string, cursor?: number): Promise<TikTokVideosResponseDto> {
    const url = new URL(this._tikTokApiVideoInfoUrl);
    url.searchParams.append(
      "fields",
      "id, title, video_description, create_time, view_count,like_count,comment_count,share_count",
    );
    const body = {
      max_count: 20,
      cursor: cursor,
    };

    return await this.sendPostStatisticRequest(url.toString(), TikTokVideosResponseDto, body, token);
  }

  public async getLocalVideos(influencerId: number, from?: string, to?: string): Promise<TikTokeVideoListResponseDto> {
    const videos = await this._tiktokVideoRepo.getAllByInfluencerIdDate(influencerId, from, to);
    const token = await this._tiktokTokenRepo.getByInfluencerId(influencerId);
    const videosDto = this._mapper.mapArray(videos, TiktokVideoEntity, TikTokVideoResponseDto);

    return {
      totalCount: videosDto.length,
      username: token.username,
      videos: videosDto,
    };
  }

  private calculateVideoStatistic(videos: TikTokBaseVideoResponseDto[]): TikTokVideoStatisticResponseDto {
    const totalCounts = {
      sharesCount: 0,
      likesCount: 0,
      viewsCount: 0,
      commentsCount: 0,
    };
    videos.forEach((el) => {
      totalCounts.commentsCount += el.commentsCount;
      (totalCounts.likesCount += el.likesCount), (totalCounts.sharesCount += el.sharesCount);
      totalCounts.viewsCount += el.viewsCount;
    });

    return {
      sharesCountAverage: +(totalCounts.sharesCount / videos.length).toFixed(2),
      viewsCountAverage: +(totalCounts.viewsCount / videos.length).toFixed(2),
      likesCountAverage: +(totalCounts.likesCount / videos.length).toFixed(2),
      commentsCountAverage: +(totalCounts.commentsCount / videos.length).toFixed(2),

      totalVideos: videos.length,
    };
  }

  public async getAllStatistics(influencerId: number): Promise<TiktokAllStatisticsResponseDto> {
    const insight = await this._tiktokInsightsRepo.getByInfluencerId(influencerId);

    if (insight == null) {
      throw new NotFoundException(`influencer with id ${influencerId} not found!`);
    }

    return this._mapper.map(insight, TiktokInsightsEntity, TiktokAllStatisticsResponseDto);
  }

  public async updatePersonalInsight(influencerId: number): Promise<void> {
    const insight = await this.getInsightOrFail(influencerId);

    const tikapiUser = await this.generateTikapiUser(influencerId);

    const response = await tikapiUser.info().json;

    const channelResponse: TikapiChannelResponseDto = response["userInfo"]["stats"];
    insight.followersCount = channelResponse.followerCount;

    await this._tiktokInsightsRepo.save(insight);
  }

  public async updateGenderAndCountryInsight(insight: TiktokInsightsEntity): Promise<void> {
    const tikapiUser = await this.generateTikapiUser(insight.influencer.id);

    const response = await tikapiUser.analytics({
      type: "followers",
    }).json;

    const genderResponse: TikapiGenderResponseDto = response["follower_gender_percent"];
    const countryResponse: TikapiCountryResponseDto = response["follower_region_percent"];

    const genderInsight = new TiktokGenderInsightEntity();
    genderInsight.maleCount = +genderResponse.value.find((item) => item.key == "Male").value.toFixed(2);
    genderInsight.femaleCount = +genderResponse.value.find((item) => item.key == "Male").value.toFixed(2);
    genderInsight.personalInsights = insight;

    const countryInsights: TiktokCountryInsightEntity[] = [];
    const currentCountryNames = countryResponse.value.map((country) => country.key);
    await this._tiktokCountryInsightRepo.removeAllWitchNotIncludeNames(currentCountryNames);

    for (const country of countryResponse.value) {
      const countryInsightRecord = await this._tiktokCountryInsightRepo.getByNameOrGenerateNewEntity(country.key);
      countryInsightRecord.count = country.value;
      countryInsights.push(countryInsightRecord);
    }

    await this._tiktokCountryInsightRepo.saveRange(countryInsights);
    await this._tiktokGenderInsightRepo.save(genderInsight);
  }

  private async getInsightOrFail(influencerId: number): Promise<TiktokInsightsEntity> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);
    if (influencer == null) {
      throw new NotFoundException(`influencer with id ${influencerId} not found!`);
    }

    const insight = await this._tiktokInsightsRepo.getByInfluencerId(influencerId);
    if (insight == null) {
      throw new NotFoundException(`youtube insight by influencer with id ${influencerId} not found!`);
    }

    return insight;
  }

  private async getTokenOrFail(influencerId: number): Promise<TiktokTokenEntity> {
    const token = await this._tiktokTokenRepo.getByInfluencerId(influencerId);
    if (token == null) {
      throw new NotFoundException(`influencer with id ${influencerId} not connected to tiktok!`);
    }

    return token;
  }

  public async updateBaseInsigth(influencerId: number): Promise<void> {
    const insight = await this.getInsightOrFail(influencerId);
    const baseStatistic = await this.getBaseStatistic(influencerId);

    insight.followersCount = baseStatistic.followersCount;

    await this._tiktokInsightsRepo.save(insight);
  }

  private async generateTikapiUser(influencerId: number) {
    const token = await this.getTokenOrFail(influencerId);

    const tikapiUser = new this._tikApiClient.user({
      accountKey: token.accessToken,
    });

    return tikapiUser;
  }

  public async getAllStatisticsForUnauthorizedUser(
    influencerId: number,
    verifyCode: string,
  ): Promise<TiktokAllStatisticsResponseDto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, influencerId);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getAllStatistics(influencerId);
  }

  public async getVideoListForUnauthorizedUser(
    influencerId: number,
    verifyCode: string,
    from?: string,
    to?: string,
  ): Promise<TikTokeVideoListResponseDto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, influencerId);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getLocalVideos(influencerId, from, to);
  }

  private async sendPostRequest<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    body: any,
  ): Promise<TResponse> {
    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<unknown>>(
        this._httpService.post(uri, body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }),
      );
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      throw new UniHttpException("TikTok post error", e);
    }
  }
  private async sendGetStatisticRequest<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    accessToken: string,
  ): Promise<TResponse> {
    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<TikTokBaseResponseDto<TResponse>>>(
        this._httpService.get(uri, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      const res = plainToInstance(ctor, rawRes.data.data);
      console.log("res", res);

      return res;
    } catch (e) {
      // console.log('error', e);
      throw new UniHttpException("TikTok get statistic error", e);
    }
  }

  private async sendPostStatisticRequest<TResponse>(
    uri: string,
    ctor: ClassConstructor<TResponse>,
    body: any,
    accessToken: string,
  ): Promise<TResponse> {
    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<TikTokBaseResponseDto<TResponse>>>(
        this._httpService.post(uri, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      return plainToInstance(ctor, rawRes.data.data);
    } catch (e) {
      console.log("error", e);

      throw new UniHttpException("TikTok get statistic error", e);
    }
  }

  public async deleteToken(influencerId: number): Promise<number> {
    const token = await this.getTokenOrFail(influencerId);
    const businessToken = await this._tiktokBusinessTokenRepo.getByInfluencerId(influencerId);
    const insight = await this._tiktokInsightsRepo.getByInfluencerId(influencerId);

    const influencer = await this._influencerRepo.getById(influencerId);
    influencer.tiktokProfile = null;

    await this._influencerRepo.save(influencer);
    await this._tiktokInsightsRepo.remove(insight);
    await this._tiktokTokenRepo.remove(token);
    if (businessToken != null) {
      await this._tiktokBusinessTokenRepo.remove(businessToken);
    }
    return influencerId;
  }
}
