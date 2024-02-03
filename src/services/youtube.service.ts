import { BadRequestException, HttpException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { isArray } from "class-validator";
import { ClassConstructor } from "class-transformer";
import { google } from "googleapis";
import { OAuth2Client } from "googleapis-common";
import fetch from "cross-fetch";
import { URL } from "url";

import { YoutubeInsightsEntity } from "src/DAL/entities/youtube/youtube.insights.entity";
import { YoutubeCompletionRateResponseDto } from "src/dto/youtube/response/youtube.completion-rate.response.dto";
import { YoutubeChannelStatisticResponseDto } from "src/dto/youtube/response/youtube.channel-statistic.response.dto";
import { YoutubeAgeResponseDto } from "src/dto/youtube/response/youtube.age.response.dto";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { PlacementTokenRepository } from "src/DAL/repositories/placement-token.repository";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { InfluencerService } from "src/services/influencer.service";
import { PlacementTokenEntity } from "src/DAL/entities/placement-token.entity";
import { YoutubeGenderResponseDto } from "src/dto/youtube/response/youtube.gender.response.dto";
import { YoutubeCountryResponseDto } from "src/dto/youtube/response/youtube.country.response.dto";
import { YoutubeActivityStatisticResponseDto } from "src/dto/youtube/response/youtube.activity-statistic.response.dto";
import { YoutubeAllStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.statistics.response.dto";
import { YoutubeAuthDto } from "src/dto/youtube/youtube.auth.dto";
import { YoutubeDeviceResponseDto } from "src/dto/youtube/response/youtube.device.response.dto";
import { YoutubeGrowsAndLossesResponseDto } from "src/dto/youtube/response/youtube.grows.response.dto";
import { YoutubeBaseCountriesResponseDto } from "src/dto/youtube/response/youtube.base.country.response.dto";
import { MathOperationHelper } from "src/infrastructure/utils/math-operations.helper";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { YoutubeAgeInsightRepository } from "src/DAL/repositories/youtube/youtube.age.insight.repository";
import { YoutubeCountryInsightRepository } from "src/DAL/repositories/youtube/youtube.country.insight.repository";
import { YoutubeGenderInsightRepository } from "src/DAL/repositories/youtube/youtube.gender.insight.repository";
import { YoutubeInsightsRepository } from "src/DAL/repositories/youtube/youtube.insights.repository";
import { YoutubeGenderInsightEntity } from "src/DAL/entities/youtube/youtube.gender.insight.entity";
import { YoutubeAgeInsightEntity } from "src/DAL/entities/youtube/youtube.age.insight.entity";
import { YoutubeCountryInsightEntity } from "src/DAL/entities/youtube/youtube.country.insight.entity";
import { DateHelper } from "src/infrastructure/utils/date.helper";
import { YoutubeTokenCreateDto } from "src/dto/youtube/youtube.create.token.dto";
import { InfluencerStatisticVerifyTokenRepository } from "src/DAL/repositories/influencer.statistic-verify-token.repository";
import { YoutubeVideoStatisticResponseDto } from "src/dto/youtube/response/youtube.video-statistic.response.dto";
import { YoutubeOneStatisticsResponseDto } from "src/dto/youtube/response/youtube.one.statistics.response.dto";
import { UrlShorterService } from "./url-shortter.service";
import { UniHttpException } from "@unistory/nestjs-common";
import { Mapper } from "@automapper/core";
import { YoutubeBaseAgeResponseDto } from "src/dto/youtube/response/youtube.base-age.response.dto";
import { InjectMapper } from "@automapper/nestjs";
import { YoutubeDevicesInsightRepository } from "src/DAL/repositories/youtube/youtube.devices.insight.repository";
import { YoutubeCompletionRateInsightRepository } from "src/DAL/repositories/youtube/youtube.completion-rate.insight.repository";
import { YoutubeDevicesInsightEntity } from "src/DAL/entities/youtube/youtube.devices.insight.entity";
import { YoutubeCompletionRateInsightEntity } from "src/DAL/entities/youtube/youtube.complation-rate.insight.entity";
import { YoutubeLogAgeInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.age.insight.entity";
import { YoutubeLogInsightsEntity } from "src/DAL/entities/youtube/log/youtube-log.insights.entity";
import { YoutubeLogInsightsRepository } from "src/DAL/repositories/youtube/youtube-log.insights.repository";
import { YoutubeLogCountryInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.country.insight.entity";
import { YoutubeLogCompletionRateInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.complation-rate.insight.entity";
import { YoutubeLogDevicesInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.devices.insight.entity";
import { YoutubeLogGenderInsightEntity } from "src/DAL/entities/youtube/log/youtube-log.gender.insight.entity";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { YoutubeAllLogStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.log-statistics.response.dto";
import { YoutubeVideoListResponseDto } from "src/dto/youtube/response/youtube.video-list.response.dto";

@Injectable()
export class YoutubeService {
  private readonly _google0AuthBasePath: string;
  private readonly _googleAuthBasePath: string;
  private readonly _youtubeAnalyticPath: string;
  private readonly _youtubeAPIPath: string;

  private readonly _scopes: string[];

  private readonly _oauth2Client: OAuth2Client;
  private readonly _logger = new Logger();
  constructor(
    private readonly _configService: ProjectConfigService,
    private readonly _influencerService: InfluencerService,
    private readonly _repository: PlacementTokenRepository,
    private readonly _managerRepo: ManagerRepository,

    private readonly _youtubeInsightsRepo: YoutubeInsightsRepository,
    private readonly _youtubeCountryInsightRepo: YoutubeCountryInsightRepository,
    private readonly _youtubeGenderInsightRepo: YoutubeGenderInsightRepository,
    private readonly _youtubeAgeInsightRepo: YoutubeAgeInsightRepository,
    private readonly _youtubeDevicesInsightRepo: YoutubeDevicesInsightRepository,
    private readonly _youtubeCompletionRateInsightRepo: YoutubeCompletionRateInsightRepository,

    private readonly _youtubeLogInsightsRepo: YoutubeLogInsightsRepository,

    private readonly _influencerRepo: InfluencerRepository,
    private readonly _placementTokenRepo: PlacementTokenRepository,
    private readonly _statisticTokenRepository: InfluencerStatisticVerifyTokenRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,

    private readonly _urlShorterService: UrlShorterService,
  ) {
    this._google0AuthBasePath = "https://oauth2.googleapis.com/";
    this._googleAuthBasePath = "https://www.googleapis.com/auth/";
    this._youtubeAnalyticPath = "https://youtubeanalytics.googleapis.com/v2/";
    this._youtubeAPIPath = "https://www.googleapis.com/youtube/v3/";

    this._scopes = [
      `${this._googleAuthBasePath}yt-analytics-monetary.readonly`,
      `${this._googleAuthBasePath}yt-analytics.readonly`,
      `https://www.googleapis.com/auth/youtube.readonly`,
    ].sort();

    this._oauth2Client = new google.auth.OAuth2(
      this._configService.googleClientId,
      this._configService.googleClientSecret,
      this._configService.googleRedirectUrl,
    );
  }
  public async getAll() {
    return await this._placementTokenRepo.getAll();
  }

  public async getAllInsights() {
    return await this._youtubeInsightsRepo.getAllFull();
  }

  public async sendAuthEmailLink(influencerId: number): Promise<string> {
    await this._influencerService.getOneOrFail(influencerId);
    const authUrl = this._oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this._scopes,
      state: `influencerId=${influencerId}`,
    });
    return await this._urlShorterService.generateShortLink(authUrl);
  }

  public async signIn(influencerId: number, dto: YoutubeAuthDto): Promise<void> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);

    const dtoSortedScopes = dto.scopes.sort();

    if (dtoSortedScopes.length != this._scopes.length) {
      throw new BadRequestException("one or more rights were not granted or more rights were granted");
    }

    for (let i = 0; i < this._scopes.length; i++) {
      if (dtoSortedScopes[i] != this._scopes[i]) {
        throw new BadRequestException("one or more rights were not granted or more rights were granted");
      }
    }
    try {
      const { tokens } = await this._oauth2Client.getToken(dto.verifyCode);
      const youtubeToken = await this._placementTokenRepo.getByInfluencerIdAndType(influencerId, PlacementType.YOUTUBE);

      if (youtubeToken != null) {
        youtubeToken.accessToken = tokens.access_token;
        youtubeToken.refreshToken = tokens.refresh_token;
        await this._placementTokenRepo.save(youtubeToken);
        return;
      }

      const newYoutubeToken = new PlacementTokenEntity();
      newYoutubeToken.accessToken = tokens.access_token;
      newYoutubeToken.refreshToken = tokens.refresh_token;
      newYoutubeToken.type = PlacementType.YOUTUBE;
      newYoutubeToken.influencer = influencer;

      const localInsight = new YoutubeInsightsEntity();
      localInsight.influencer = influencer;
      localInsight.date = DateHelper.getYesterday();

      await this._youtubeInsightsRepo.save(localInsight);
      await this._placementTokenRepo.save(newYoutubeToken);

      await this.disconnectAccountAndFailIfConnected(influencerId);
      influencer.youtubeProfile = await this.getChannelName(influencer.id);
      await this._influencerRepo.save(influencer);
      await this.updateLocalDbStatistic(influencer.id);
    } catch (error) {
      if (error?.response?.data?.error == "invalid_grant") {
        throw new UniHttpException("Invalid verify code", 400);
      }
    }
  }

  private async disconnectAccountAndFailIfConnected(influencerId: number): Promise<void> {
    const channelName = await this.getChannelName(influencerId);
    const platforms = await this._influencerRepo.getAllPlatforms();

    if (platforms.youtube.includes(channelName)) {
      await this.deleteYoutubeToken(influencerId);
      throw new UniHttpException("account with display name " + channelName + " is already connected");
    }
  }

  public async signInByHands(influencerId: number, tokenDto: YoutubeTokenCreateDto): Promise<void> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);

    const youtubeToken = await this._placementTokenRepo.getByInfluencerIdAndType(influencerId, PlacementType.YOUTUBE);

    if (youtubeToken != null) {
      youtubeToken.accessToken = tokenDto.accessToken;
      youtubeToken.refreshToken = tokenDto.refreshToken;
      await this._placementTokenRepo.save(youtubeToken);
    } else {
      const newYoutubeToken = new PlacementTokenEntity();
      newYoutubeToken.accessToken = tokenDto.accessToken;
      newYoutubeToken.refreshToken = tokenDto.refreshToken;
      newYoutubeToken.type = PlacementType.YOUTUBE;
      newYoutubeToken.influencer = influencer;
      console.log("tut");
      await this._placementTokenRepo.save(newYoutubeToken);
    }

    const localInsight = await this._youtubeInsightsRepo.getByInfluencerId(influencerId);

    if (localInsight == null) {
      const newLocalInsight = new YoutubeInsightsEntity();
      newLocalInsight.influencer = influencer;
      newLocalInsight.date = DateHelper.getYesterday();

      await this._youtubeInsightsRepo.save(newLocalInsight);
    }
  }
  public async deleteYoutubeToken(influencerId: number): Promise<number> {
    const influencer = await this._influencerService.getOneOrFail(influencerId);
    influencer.youtubeProfile = null;

    const token = await this.getTokenOrFail(influencerId);
    const youtubeInsight = await this._youtubeInsightsRepo.getByInfluencerId(influencerId);

    await this._oauth2Client.revokeToken(token.accessToken);

    await this._youtubeInsightsRepo.remove(youtubeInsight);
    await this._repository.remove(token);
    await this._influencerRepo.save(influencer);
    return influencerId;
  }

  public async getAllStatistics(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId?: string,
  ): Promise<YoutubeAllStatisticsResponseDto> {
    const genderStatistic = await this.getGenderStatistic(influencerId, from, to, videoId);
    const countryStatistic = await this.getCountryStatistic(influencerId, from, to, videoId);
    const averageViewsPerVideos = await this.getAverageViewsPerVideos(influencerId);
    const completionRateStatistic = await this.getCompletionRateStatistic(influencerId, from, to, videoId);
    const deviceStatistic = await this.getDeviceStatistic(influencerId, from, to, videoId);
    const grows = await this.getGrowsAndLossesStatistic(influencerId, from, to);
    const channelStatistic = await this.getChannelStatistic(influencerId, from, to);
    const engagementRate = await this.getEngagementRateStatistic(influencerId);
    const ageStatistic = await this.getAgeStatistic(influencerId, from, to, videoId);
    return {
      ages: ageStatistic,
      genders:  genderStatistic,
      countries:  countryStatistic,
      subscribersCount:  channelStatistic.subscriberCount,
      viewsPerVideos:  averageViewsPerVideos,
      views: channelStatistic.viewCount,
      rate:  completionRateStatistic,
      engagementRate: engagementRate,
      devices:  deviceStatistic,
      growsAndLosses:  grows,
    };
  }
  public async getAllLocalStatistics(influencerId: number): Promise<YoutubeAllStatisticsResponseDto> {
    const statistic = await this._youtubeInsightsRepo.getFullByInfluencerId(influencerId);
    console.log('statistic', statistic);
    return this._mapper.map(statistic, YoutubeInsightsEntity, YoutubeAllStatisticsResponseDto);
  }

  public async getAllLogStatistics(influencerId: number): Promise<YoutubeAllLogStatisticsResponseDto[]> {
    const logStatistic = await this._youtubeLogInsightsRepo.getAllFullWithManagerByInfluencerId(influencerId);
    console.log("logStatistic", logStatistic);
    return this._mapper.mapArray(logStatistic, YoutubeLogInsightsEntity, YoutubeAllLogStatisticsResponseDto);
  }

  public async getOneStatistics(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId: string,
  ): Promise<YoutubeOneStatisticsResponseDto> {
    const ageStatisticPromise = this.getAgeStatistic(influencerId, from, to, videoId);
    const genderStatisticPromise = this.getGenderStatistic(influencerId, from, to, videoId);
    const countryStatisticPromise = this.getCountryStatistic(influencerId, from, to, videoId);
    const deviceStatisticPromise = this.getDeviceStatistic(influencerId, from, to, videoId);
    await Promise.all([ageStatisticPromise, genderStatisticPromise, countryStatisticPromise, deviceStatisticPromise]);
    const videoStatistic = await this.getVideoStatistic(influencerId, videoId);
    return {
      ages: await ageStatisticPromise,
      genders: await genderStatisticPromise,
      countries: await countryStatisticPromise,
      devices: await deviceStatisticPromise,
      views: videoStatistic.views,
      comments: videoStatistic.comments,
      likes: videoStatistic.likes,
      dislikes: videoStatistic.dislikes,
    };
  }

  public async getAllStatisticsForUnauthorizedUser(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    verifyCode: string,
  ): Promise<YoutubeAllStatisticsResponseDto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, influencerId);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getAllLocalStatistics(influencerId);
  }



  public async getVideoListForUnauthorizedUser(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    verifyCode: string,
  ): Promise<YoutubeVideoListResponseDto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, influencerId);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getVideoList(influencerId, from, to);
  }
  public async getAgeStatistic(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId?: string,
  ): Promise<YoutubeAgeResponseDto[]> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("dimensions", "ageGroup");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "viewerPercentage");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    const baseAges = await this.getAnalyticStatistic<YoutubeBaseAgeResponseDto>(
      influencerId,
      url,
      false,
      YoutubeBaseAgeResponseDto,
    );
    const ageNames = Object.keys(baseAges);
    const result: YoutubeAgeResponseDto[] = [];
    for (const name of ageNames) {
      const age = new YoutubeAgeResponseDto();
      age.name = name;
      age.count = baseAges[name];

      result.push(age);
    }
    console.log('result', result);
    return result;
  }

  public async getDeviceStatistic(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId?: string,
  ): Promise<YoutubeDeviceResponseDto> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("dimensions", "deviceType");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "views");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    return await this.getAnalyticStatistic<YoutubeDeviceResponseDto>(
      influencerId,
      url,
      false,
      YoutubeDeviceResponseDto,
    );
  }

  public async getGenderStatistic(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId?: string,
  ): Promise<YoutubeGenderResponseDto> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("dimensions", "gender");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "viewerPercentage");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    const res =  await this.getAnalyticStatistic<YoutubeGenderResponseDto>(
      influencerId,
      url,
      false,
      YoutubeGenderResponseDto,
    );
    console.log('genders ss', res);
    return res
  }

  public async getCountryStatistic(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
    videoId?: string,
  ): Promise<YoutubeCountryResponseDto[]> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("dimensions", "country");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "views");
    url.searchParams.append("sort", "-views");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    const countries = await this.getAnalyticStatistic<YoutubeBaseCountriesResponseDto>(
      influencerId,
      url,
      false,
      YoutubeBaseCountriesResponseDto,
    );
    return Object.keys(countries).map((countryName) => {
      return {
        name: countryName,
        count: countries[countryName],
      };
    });
  }

  public async getSubscribersCount(influencerId: number, from?: string, to?: string): Promise<number> {
    const statistic = await this.getChannelStatistic(influencerId);
    return statistic.subscriberCount;
  }

  public async getGrowsAndLossesStatistic(
    influencerId: number,
    from: string,
    to: string,
  ): Promise<YoutubeGrowsAndLossesResponseDto> {
    if (from == this._configService.youtubeAccountStartTime || to == this._configService.youtubeAccountEndTime) {
      return null;
    }
    const urlGrows = new URL(this._youtubeAnalyticPath + "reports");
    urlGrows.searchParams.append("ids", "channel==MINE");
    urlGrows.searchParams.append("metrics", "subscribersGained");
    urlGrows.searchParams.append("startDate", from);
    urlGrows.searchParams.append("endDate", to);

    const urlLosses = new URL(this._youtubeAnalyticPath + "reports");
    urlLosses.searchParams.append("ids", "channel==MINE");
    urlLosses.searchParams.append("metrics", "subscribersLost");
    urlLosses.searchParams.append("startDate", from);
    urlLosses.searchParams.append("endDate", to);

    const grows = await this.getAnalyticStatistic<YoutubeGrowsAndLossesResponseDto>(
      influencerId,
      urlGrows,
      true,
      YoutubeGrowsAndLossesResponseDto,
    );

    const losses = await this.getAnalyticStatistic<YoutubeGrowsAndLossesResponseDto>(
      influencerId,
      urlLosses,
      true,
      YoutubeGrowsAndLossesResponseDto,
    );
    return {
      subscribersGained: grows.subscribersGained,
      subscribersLost: losses.subscribersLost,
    };
  }

  public async getEngagementRateStatistic(influencerId: number): Promise<number> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "likes,dislikes,comments");
    url.searchParams.append("startDate", this._configService.youtubeAccountStartTime);
    url.searchParams.append("endDate", this._configService.youtubeAccountEndTime);

    const activityStatistic = await this.getAnalyticStatistic<YoutubeActivityStatisticResponseDto>(
      influencerId,
      url,
      true,
      YoutubeActivityStatisticResponseDto,
    );

    const channelStatistic = await this.getChannelStatistic(influencerId);

    const result = this.calculateEngagement(
      activityStatistic.likes,
      activityStatistic.comments,
      activityStatistic.dislikes,
      channelStatistic.videoCount,
      channelStatistic.subscriberCount,
    );
    return result;
  }

  public async getAverageViewsPerVideos(influencerId: number): Promise<number> {
    const statistic = await this.getChannelStatistic(influencerId);
    const averageViewsPerVideos = statistic.viewCount / statistic.videoCount;

    return +averageViewsPerVideos.toFixed(2);
  }

  public async getCompletionRateStatistic(
    influencerId: number,
    from: string,
    to: string,
    videoId?: string,
  ): Promise<YoutubeCompletionRateResponseDto> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "averageViewPercentage,averageViewDuration");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    return await this.getAnalyticStatistic<YoutubeCompletionRateResponseDto>(
      influencerId,
      url,
      true,
      YoutubeCompletionRateResponseDto,
    );
  }

  public async getVideoStatistic(
    influencerId: number,
    videoId: string,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
  ): Promise<YoutubeVideoStatisticResponseDto> {
    const url = new URL(this._youtubeAnalyticPath + "reports");
    url.searchParams.append("ids", "channel==MINE");
    url.searchParams.append("metrics", "views,comments,likes,dislikes");
    url.searchParams.append("startDate", from);
    url.searchParams.append("endDate", to);

    if (videoId != null) {
      url.searchParams.append("filters", `video==${videoId}`);
    }

    return await this.getAnalyticStatistic<YoutubeVideoStatisticResponseDto>(
      influencerId,
      url,
      true,
      YoutubeVideoStatisticResponseDto,
    );
  }

  private async getChannelStatistic(
    influencerId: number,
    from?: string,
    to?: string,
  ): Promise<YoutubeChannelStatisticResponseDto> {
    const youtubeToken = await this.getTokenOrFail(influencerId);

    // const youtubeToken = {
    //   accessToken: "ya29.a0AbVbY6OBf-cqL5QQuJjXl9Yq4SM7zIpOWamIP7MVX672k9deKf0ecXr3D9JoxujgjwoEsIhj6qfvCJXdcyKLAKKCBnlSwxwVsLMd4z8R55eImd3-ys6fLErCNCq56ZGP1LsXanSewTArh1nh60MBuQG6eilR6VIpaCgYKASsSARASFQFWKvPlxInxGCZY1UpS_sMuQFI1iQ0167"
    // }

    const url = new URL(this._youtubeAPIPath + "channels");
    url.searchParams.append("mine", "true");
    url.searchParams.append("part", "statistics");

    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${youtubeToken.accessToken}`,
      },
    });

    response = await response.json();
    // console.log('response', response);

    if (response["error"] != null) {
      if (response["error"].code == 401) {
        await this.refreshAccessToken(influencerId);
        return await this.getChannelStatistic(influencerId, from, to);
      }
      if (response["error"].code == 403) {
        throw new HttpException(`Can't get statistic from youtube because "the quota limit has been used up") `, 400);
      }
      this._logger.error(
        `Can't get statistic from youtube (error.status=${response["error"]}) on influencer with id ${influencerId}`,
      );
      throw new HttpException(`Can't get statistic from youtube (error.status=${response["error"]}) `, 500);
    }

    const statistic = response["items"][0].statistics;
    console.log("statistic", statistic);

    return {
      viewCount: +statistic["viewCount"],
      subscriberCount: +statistic["subscriberCount"],
      hiddenSubscriberCount: statistic["hiddenSubscriberCount"],
      videoCount: +statistic["videoCount"],
    };
  }
  private async getAnalyticStatistic<StatisticDto extends object>(
    influencerId: number,
    url: URL,
    columnResponse: boolean,
    model: ClassConstructor<StatisticDto>,
  ): Promise<StatisticDto> {
    const youtubeToken = await this.getTokenOrFail(influencerId);

    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${youtubeToken.accessToken}`,
      },
    });

    response = await response.json();

    if (response["error"] != null) {
      if (response["error"].code == 401) {
        await this.refreshAccessToken(influencerId);
        return await this.getAnalyticStatistic(influencerId, url, false, model);
      }
      if (response["error"].code == 400 && response["error"].message.includes("parameters.filters")) {
        throw new BadRequestException(`Can't get statistic by video (${url.searchParams.get("filters")})`);
      }
      console.log(response["error"]);
      this._logger.error(
        `Can't get statistic from youtube (error.status=${response["error"]}) on influencer with id ${influencerId}`,
      );
      throw new HttpException(`Can't get statistic from youtube (error.status=${response["error"]}) `, 500);
    }

    const result: StatisticDto = new model();

    if (!columnResponse) {
      response["rows"].forEach((item) => {
        if (isArray(result)) {
          result.push({ [item[0]]: item[1] });
        }
        result[item[0]] = item[1];
      });
    } else {
      const fields = response["columnHeaders"].map((item) => item.name);
      const values = response["rows"][0];

      for (let i = 0; i < fields.length; i++) {
        result[fields[i]] = values[i];
      }
    }
    return result;
  }

  private async refreshAccessToken(influencerId: number): Promise<void> {
    const youtubeToken = await this.getTokenOrFail(influencerId);

    const url = new URL(this._google0AuthBasePath + "/token");
    url.searchParams.append("client_id", this._configService.googleClientId);
    url.searchParams.append("client_secret", this._configService.googleClientSecret);
    url.searchParams.append("refresh_token", youtubeToken.refreshToken);
    url.searchParams.append("grant_type", "refresh_token");

    let response = await fetch(url, {
      method: "POST",
    });

    response = await response.json();
    if (response["access_token"] == null) {
      this._logger.error(`Can't refresh youtube access token by at influencer with id=${influencerId}`, response);
      console.log("response=", response);

      throw new HttpException("Not found necessary info (access_token) in response from youtube", 500);
    }

    youtubeToken.accessToken = response["access_token"];
    await this._placementTokenRepo.save(youtubeToken);
  }

  private async getTokenOrFail(influencerId: number): Promise<PlacementTokenEntity> {
    const youtubeToken = await this._placementTokenRepo.getByInfluencerIdAndType(influencerId, PlacementType.YOUTUBE);

    if (youtubeToken == null) {
      throw new NotFoundException("youtubeToken not found!");
    }

    return youtubeToken;
  }

  private calculateEngagement(
    likes: number,
    comments: number,
    dislikes: number,
    videos: number,
    subscribers: number,
  ): number {
    likes = MathOperationHelper.toNumber(likes);
    comments = MathOperationHelper.toNumber(comments);
    dislikes = MathOperationHelper.toNumber(dislikes);
    videos = MathOperationHelper.toNumber(videos);
    subscribers = MathOperationHelper.toNumber(subscribers);

    const sumOfActivities = likes + comments + dislikes;
    const sumOfActsPerVideos = sumOfActivities / videos;
    const ActsPerVideosPerSubscribers = sumOfActsPerVideos / subscribers;

    const engagement = ActsPerVideosPerSubscribers * 100;
    return MathOperationHelper.toNumber(engagement);
  }
  public async updateLocalDbStatistic(influencerId: number): Promise<void> {
    const statistic = await this.getAllStatistics(influencerId);
    console.log('statistic', statistic);
    const localStatistic = await this._youtubeInsightsRepo.getFullByInfluencerId(influencerId);

    if (localStatistic.ages == null || localStatistic.ages.length == 0) {
      await this._youtubeAgeInsightRepo.removeAllByIds(localStatistic.ages.map((el) => el.id));
    }
    const localAges: YoutubeAgeInsightEntity[] = [];
    localStatistic.ages = localAges;

    if (localStatistic.countries == null || localStatistic.countries.length == 0) {
      await this._youtubeCountryInsightRepo.removeAllByIds(localStatistic.countries.map((el) => el.id));
    }
    const localCountries: YoutubeCountryInsightEntity[] = [];
    localStatistic.countries = localCountries;

    localStatistic.impressions = statistic.views;
    localStatistic.engagement = statistic.engagementRate;
    localStatistic.followersCount = statistic.subscribersCount;
    localStatistic.ages = this._mapper.mapArray(statistic.ages, YoutubeAgeResponseDto, YoutubeAgeInsightEntity);
    localStatistic.countries = this._mapper.mapArray(
      statistic.countries,
      YoutubeCountryResponseDto,
      YoutubeCountryInsightEntity,
    );

    localStatistic.genders = this._mapper.map(statistic.genders, YoutubeGenderResponseDto, YoutubeGenderInsightEntity);
    localStatistic.devices = this._mapper.map(statistic.devices, YoutubeDeviceResponseDto, YoutubeDevicesInsightEntity);
    localStatistic.rate = this._mapper.map(
      statistic.rate,
      YoutubeCompletionRateResponseDto,
      YoutubeCompletionRateInsightEntity,
    );
    console.log('localStatistic', localStatistic);  
    await localStatistic.save();
  }

  public async updateLogStatistic(influencerId: number, managerId?: number): Promise<void> {
    await this._youtubeLogInsightsRepo.removeAllByInfluencerId(influencerId);

    const localStatistic = await this._youtubeInsightsRepo.getFullByInfluencerId(influencerId);
    const influencer = await this._influencerRepo.getById(influencerId);

    const newLogStatistic = new YoutubeLogInsightsEntity();
    newLogStatistic.influencer = influencer;

    if (managerId != null) {
      const manager = await this._managerRepo.getById(managerId);
      newLogStatistic.manager = manager;
    }

    newLogStatistic.impressions = localStatistic.impressions;
    newLogStatistic.engagement = localStatistic.engagement;
    newLogStatistic.followersCount = localStatistic.followersCount;
    newLogStatistic.ages = this._mapper.mapArray(
      localStatistic.ages,
      YoutubeAgeInsightEntity,
      YoutubeLogAgeInsightEntity,
    );
    newLogStatistic.countries = this._mapper.mapArray(
      localStatistic.countries,
      YoutubeCountryInsightEntity,
      YoutubeLogCountryInsightEntity,
    );

    newLogStatistic.genders = this._mapper.map(
      localStatistic.genders,
      YoutubeGenderInsightEntity,
      YoutubeLogGenderInsightEntity,
    );
    newLogStatistic.devices = this._mapper.map(
      localStatistic.devices,
      YoutubeDevicesInsightEntity,
      YoutubeLogDevicesInsightEntity,
    );
    newLogStatistic.rate = this._mapper.map(
      localStatistic.rate,
      YoutubeCompletionRateInsightEntity,
      YoutubeLogCompletionRateInsightEntity,
    );

    await this._youtubeLogInsightsRepo.save(newLogStatistic);
  }

  public async setDefaultInsight(influencerId: number): Promise<void> {
    const influecnersWithInsights = await this._influencerRepo.getAllWithInsights();

    const newInsights: YoutubeInsightsEntity[] = [];

    for (const influencer of influecnersWithInsights) {
      if (influencer.youtubeInsight == null && influencer.id == influencerId) {
        const newYoutubeInsight = new YoutubeInsightsEntity();
        newYoutubeInsight.influencer = influencer;
        newYoutubeInsight.date = DateHelper.getYesterday();
        newInsights.push(newYoutubeInsight);
      }
    }
    await this._youtubeInsightsRepo.saveRange(newInsights);
  }

  public async deleteInsightByInfluencerId(influencerId: number): Promise<void> {
    const insight = await this._youtubeInsightsRepo.getByInfluencerId(influencerId);

    if (insight != null) {
      await this._youtubeInsightsRepo.remove(insight);
    }
  }

  public async deleteInsight(insightId: number): Promise<void> {
    const insight = await this._youtubeInsightsRepo.getById(insightId);

    if (insight != null) {
      await this._youtubeInsightsRepo.remove(insight);
    }
  }

  private async getChannelName(influencerId: number): Promise<string> {
    const youtubeToken = await this.getTokenOrFail(influencerId);

    const url = new URL(this._youtubeAPIPath + "channels");
    url.searchParams.append("mine", "true");
    url.searchParams.append("part", "snippet");
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${youtubeToken.accessToken}`,
        },
      });
      response = await response.json();
      return response["items"][0].snippet.customUrl.slice(1);
    } catch (error) {
      this._logger.warn(`getChannelName failed by google error:`, error);
      throw new HttpException(`can't get channel name by influencer ${influencerId}`, 500);
    }
  }
  private async getChannelId(influencerId: number): Promise<string> {
    await this.refreshAccessToken(influencerId);
    const youtubeToken = await this.getTokenOrFail(influencerId);

    const url = new URL(this._youtubeAPIPath + "channels");
    url.searchParams.append("mine", "true");
    url.searchParams.append("part", "id");
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${youtubeToken.accessToken}`,
        },
      });
      response = await response.json();      
      return response["items"][0].id;
    } catch (error) {
      this._logger.warn(`getChannelId failed by google error:`, error);
      throw new HttpException(`can't get channel id by influencer ${influencerId}`, 500);
    }
  }

  public async getVideoList(
    influencerId: number,
    from: string = this._configService.youtubeAccountStartTime,
    to: string = this._configService.youtubeAccountEndTime,
  ): Promise<YoutubeVideoListResponseDto> {
    await this.refreshAccessToken(influencerId);

    const youtubeToken = await this.getTokenOrFail(influencerId);
    const channelId = await this.getChannelId(influencerId);

    const url = new URL(this._youtubeAPIPath + "search");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("maxResults", "50");
    url.searchParams.append("type", "video");
    url.searchParams.append("videoDuration", "any");
    url.searchParams.append("videoSyndicated", "true");
    url.searchParams.append("order", "date");
    url.searchParams.append("videoEmbeddable", "true");
    url.searchParams.append("publishedAfter", `${from}T00:00:00.777497Z`);
    url.searchParams.append("publishedBefore", `${to}T00:00:00.777497Z`);
    url.searchParams.append("channelId", channelId);
    url.searchParams.append("key", "AIzaSyCdePcrekcczh2jaEfqjLWeJLQ-nucJgH8");

    let totalCount: number = 0;
    const videos = [];
    try {
      let isLastIteration = false;

      while (!isLastIteration) {
        let response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${youtubeToken.accessToken}`,
          },
        });
        response = await response.json();

        totalCount += response["items"].length;
        const videoPromises = [];

        for (const el of response["items"]) {
          const videoId = el.id.videoId;
          const resultPromise = this.getVideoStatistic(influencerId, videoId);
          videoPromises.push(resultPromise);
        }
        const localVideos = (await Promise.all(videoPromises)) as YoutubeVideoStatisticResponseDto[];

        for (const [index, element] of localVideos.entries()) {
          element.id = response["items"][index].id.videoId;
          element.title = response["items"][index].snippet.title;
          element.description = response["items"][index].snippet.description;
          element.description = response["items"][index].snippet.publishedAt;
        }
        videos.push(...localVideos);

        isLastIteration = !response["nextPageToken"];
      }

      return {
        totalCount,
        videos,
      };
    } catch (error) {
      this._logger.warn(`getVideoCount failed by google error:`, error);
      throw new HttpException(`can't get channel name by influencer ${influencerId}`, 500);
    }
  }
}
