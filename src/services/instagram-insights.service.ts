import { Mapper } from "@automapper/core";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UniHttpException } from "@unistory/nestjs-common";

import { FacebookGraphService } from "src/services/facebook-graph.service";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { FacebookTokenRepository } from "src/DAL/repositories/facebook-token.repository";
import { InfluencerInsightsDto } from "src/dto/facebook/influencer-insights.dto";
import { InstagramCountryInsightRepository } from "src/DAL/repositories/instagram/instagram.country.insight.repository";
import { InstagramInsightsRepository } from "src/DAL/repositories/instagram/instagram.insights.repository";
import { InstagramInsightsEntity } from "src/DAL/entities/instagram/instagram.insights.entity";
import { InstagramCountryInsightEntity } from "src/DAL/entities/instagram/instagram.country.insight.entity";
import { InfluencerStatisticVerifyTokenRepository } from "src/DAL/repositories/influencer.statistic-verify-token.repository";
import { InfluencerInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-insights.dto";
import { InstagramGenderInsightRepository } from "src/DAL/repositories/instagram/instagram.gender.insight.repository";
import { InstagramAgeInsightRepository } from "src/DAL/repositories/instagram/instagram.age.insight.repository";
import { InstagramGenderInsightEntity } from "src/DAL/entities/instagram/instagram.gender.insight.entity";
import { InstagramAgeInsightEntity } from "src/DAL/entities/instagram/instagram.age.insight.entity";
import { InjectMapper } from "@automapper/nestjs";
import { BaseInsightStatisticResponseDto } from "src/dto/facebook/graph/v18/base-insight.response";
import { InstagramLogInsightsRepository } from "src/DAL/repositories/instagram/instagram-log.insights.repository";
import { InstagramLogInsightsEntity } from "src/DAL/entities/instagram/log/instagram-log.insights.entity";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { InstagramLogCountryInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.country.insight.entity";
import { InstagramLogAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.age.insight.entity";
import { InstagramLogGenderInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender.insight.entity";
import { InstagramLogGenderAgeInsightEntity } from "src/DAL/entities/instagram/log/instagram-log.gender-age.insight.entity";

import { InstagramGenderAgeInsightEntity } from "src/DAL/entities/instagram/instagram.gender-age.insight.entity";
import { InstagramGenderAgeInsightRepository } from "src/DAL/repositories/instagram/instagram.gender-age.insight.repository";
import { InfluencerLogInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-log-insights.dto";

@Injectable()
export class InstagramInsightsService {
  private readonly _logger = new Logger();
  public constructor(
    private readonly _fbGraphService: FacebookGraphService,
    private readonly _influencerRepo: InfluencerRepository,
    private readonly _facebookTokenRepo: FacebookTokenRepository,
    private readonly _managerRepo: ManagerRepository,

    private readonly _instInsightsRepo: InstagramInsightsRepository,
    private readonly _instCountryInsightRepo: InstagramCountryInsightRepository,
    private readonly _instAgeInsightRepo: InstagramAgeInsightRepository,
    private readonly _instGenderInsightRepo: InstagramGenderInsightRepository,
    private readonly _instGenderAgeInsightRepo: InstagramGenderAgeInsightRepository,

    private readonly _instLogInsightsRepo: InstagramLogInsightsRepository,
    private readonly _statisticTokenRepository: InfluencerStatisticVerifyTokenRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  public async getInfluencerLocalInsights(id: number): Promise<InfluencerInsightsV18Dto> {
    const user = await this._influencerRepo.getById(id);
    if (user == null || user.facebookTokenId == null) {
      throw new UniHttpException("Influencer not found");
    }

    const statistic = await this._instInsightsRepo.getFullByInfluencerId(id);
    console.log("statistic", statistic);
    return this._mapper.map(statistic, InstagramInsightsEntity, InfluencerInsightsV18Dto);
  }

  public async getAllLocalStatistics(influencerId: number): Promise<InfluencerLogInsightsV18Dto> {
    const statistic = await this._instLogInsightsRepo.getFullByInfluencerId(influencerId);
    console.log("local statistic", statistic);
    return this._mapper.map(statistic, InstagramLogInsightsEntity, InfluencerLogInsightsV18Dto);
  }

  public async updateLocalDbStatistic(influencerId: number, managerId?: number): Promise<void> {

    const statistic = await this.getInfluencerInsights(influencerId);
    const localStatistic = await this._instInsightsRepo.getFullByInfluencerId(influencerId);
    console.log('statistic', statistic);
    
    if (localStatistic.ages == null || localStatistic.ages.length == 0) {
      await this._instAgeInsightRepo.removeAllByIds(localStatistic.ages.map((el) => el.id));
    }
    const localAges: InstagramAgeInsightEntity[] = [];
    localStatistic.ages = localAges;

    if (localStatistic.countries == null || localStatistic.countries.length == 0) {
      await this._instCountryInsightRepo.removeAllByIds(localStatistic.countries.map((el) => el.id));
    }
    const localCountries: InstagramCountryInsightEntity[] = [];
    localStatistic.countries = localCountries;

    if (localStatistic.genders == null || localStatistic.genders.length == 0) {
      await this._instGenderInsightRepo.removeAllByIds(localStatistic.genders.map((el) => el.id));
    }
    const localGenders: InstagramGenderInsightEntity[] = [];
    localStatistic.genders = localGenders;

    if (localStatistic.genderAges == null || localStatistic.genderAges.length == 0) {
      await this._instGenderAgeInsightRepo.removeAllByIds(localStatistic.genderAges.map((el) => el.id));
    }
    const localGenderAges: InstagramGenderAgeInsightEntity[] = [];
    localStatistic.genderAges = localGenderAges;

    localStatistic.impressions = statistic.impressions;
    localStatistic.engagement = statistic.engagement;
    localStatistic.followersCount = statistic.followersCount;

    localStatistic.ages = this._mapper.mapArray(
      statistic.ages,
      BaseInsightStatisticResponseDto,
      InstagramAgeInsightEntity,
    );
    localStatistic.countries = this._mapper.mapArray(
      statistic.countries,
      BaseInsightStatisticResponseDto,
      InstagramCountryInsightEntity,
    );
    localStatistic.genders = this._mapper.mapArray(
      statistic.genderAges,
      BaseInsightStatisticResponseDto,
      InstagramGenderInsightEntity,
    );
    localStatistic.genderAges = this._mapper.mapArray(
      statistic.genderAges,
      BaseInsightStatisticResponseDto,
      InstagramGenderAgeInsightEntity,
    );

    await localStatistic.save();
  }

  public async updateLogStatistic(influencerId: number, managerId?: number): Promise<void> {
    await this._instLogInsightsRepo.removeAllByInfluencerId(influencerId);

    const localStatistic = await this._instInsightsRepo.getFullByInfluencerId(influencerId);
    const influencer = await this._influencerRepo.getById(influencerId);

    const newLogStatistic = new InstagramLogInsightsEntity();
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
      InstagramAgeInsightEntity,
      InstagramLogAgeInsightEntity,
    );
    newLogStatistic.countries = this._mapper.mapArray(
      localStatistic.countries,
      InstagramCountryInsightEntity,
      InstagramLogCountryInsightEntity,
    );
    newLogStatistic.genders = this._mapper.mapArray(
      localStatistic.genders,
      InstagramGenderInsightEntity,
      InstagramLogGenderInsightEntity,
    );
    newLogStatistic.genderAges = this._mapper.mapArray(
      localStatistic.genderAges,
      InstagramGenderAgeInsightEntity,
      InstagramLogGenderAgeInsightEntity,
    );

    await this._instLogInsightsRepo.save(newLogStatistic);
  }

  public async getInfluencerInsights(id: number): Promise<InfluencerInsightsV18Dto> {
    const user = await this._influencerRepo.getById(id);
    if (user == null || user.facebookTokenId == null) {
      throw new UniHttpException("Influencer not found");
    }

    const token = await this._facebookTokenRepo.getById(user.facebookTokenId);
    const result = new InfluencerInsightsV18Dto();

    const insightsStatistic = await this._fbGraphService.getGenderAgeCountries(token.value, token.igId);
    result.countries = insightsStatistic.countries;
    result.genders = insightsStatistic.genders;
    result.ages = insightsStatistic.ages;
    result.genderAges = insightsStatistic.genderAges;

    result.impressions = await this._fbGraphService.getMediaImpressionsByMonth(token.value, token.igId);

    const [engagement, followersCount] = await this._fbGraphService.getEngagementAndFollowersCount(
      token.value,
      token.igId,
      user.instagramProfile,
    );
    result.engagement = engagement;
    result.followersCount = followersCount;

    return result;
  }

  public async getInfluencerInsightsByPostId(id: number, postId: string): Promise<InfluencerInsightsV18Dto> {
    const user = await this._influencerRepo.getById(id);
    if (user == null || user.facebookTokenId == null) {
      throw new UniHttpException("Influencer not found");
    }

    const token = await this._facebookTokenRepo.getById(user.facebookTokenId);
    const result = new InfluencerInsightsV18Dto();

    const genderCountries = await this._fbGraphService.getGenderAgeCountries(token.value, postId);
    result.countries = genderCountries.countries;
    result.genders = genderCountries.genders;
    result.ages = genderCountries.ages;

    result.impressions = await this._fbGraphService.getMediaImpressionsByMonth(token.value, postId);

    const [engagement, followersCount] = await this._fbGraphService.getEngagementAndFollowersCount(
      token.value,
      token.igId,
      user.instagramProfile,
    );
    result.engagement = engagement;
    result.followersCount = followersCount;

    return result;
  }

  public async getInsightsForUnauthorizedUser(id: number, verifyCode: string): Promise<InfluencerInsightsV18Dto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, id);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }

    return await this.getInfluencerInsights(id);
  }

  public async getAllInsights(): Promise<InstagramInsightsEntity[]> {
    return await this._instInsightsRepo.getAllFull();
  }

  public async deleteInsight(id: number): Promise<void> {
    const entity = await this._instInsightsRepo.getById(id);
    await this._instInsightsRepo.remove(entity);
  }
}
