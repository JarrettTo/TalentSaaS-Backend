import { Injectable } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { firstValueFrom } from "rxjs";
import { AxiosBaseResponse } from "src/responses/axios-base.response";
import { UniHttpException } from "@unistory/nestjs-common";
import { LoggerService } from "@unistory/nestjs-logger";
import { HttpService } from "@nestjs/axios";
import { FacebookConstant } from "src/infrastructure/constants/facebook.constant";
import { ImpressionsResponse } from "src/responses/facebook/impressions.response";
import { BusinessDiscoveryResponse } from "src/responses/facebook/business-discovery.response";
import { GenderAgeCountriesResponse } from "src/responses/facebook/gender-age-countries.response";
import { GenderAgeCountriesDto } from "src/dto/facebook/graph/gender-age-countries.dto";
import { CountryResponseDto } from "src/dto/facebook/graph/country.response.dto";
import { GenderAgeResponseDto } from "src/dto/facebook/graph/gender-age.dto";
import { BaseInsightResponse } from "src/responses/facebook/v18/base-insight.response";
import { BaseInsightStatisticResponseDto } from "src/dto/facebook/graph/v18/base-insight.response";
import { InstagramV18InsightsEndPathsEnum } from "src/infrastructure/enums/instagram.insights.end-paths.enum";
import { GenderAgeCountriesV18Dto } from "src/dto/facebook/graph/v18/gender-age-countries.dto";
import { MathOperationHelper } from "src/infrastructure/utils/math-operations.helper";

@Injectable()
export class FacebookGraphService {
  private readonly _baseUrl = `${FacebookConstant.GraphUrl}v18.0/`;
  private readonly InsightsImpressionsEndpoint = "insights/impressions/";
  private readonly InsightsFollowersEndpoint = "insights?metric=follower_count";
  private readonly GenderAgeAndCountriesEndpoint =
    "insights?metric=audience_country,audience_gender_age&period=lifetime";
  private readonly BaseFollowerDemographicEndpoint =
    "insights?metric=follower_demographics&period=lifetime&metric_type=total_value&breakdown";
  "insights?metric=audience_country,audience_gender_age&period=lifetime";
  private readonly CountryMetric = "audience_country";
  private readonly GenderAgeMetric = "audience_gender_age";

  public constructor(private readonly _logger: LoggerService, private readonly _httpService: HttpService) {}

  private async getFollowersDemographicInsights(
    token: string,
    igId: string,
    uriEndPath: InstagramV18InsightsEndPathsEnum,
  ): Promise<BaseInsightStatisticResponseDto[]> {
    const uri = `${this._baseUrl}${igId}/${this.BaseFollowerDemographicEndpoint}=${uriEndPath}&access_token=${token}`;
    const response = await this.sendGetRequest(uri, BaseInsightResponse);

    const countriesInsight = response.data[0].totalValue.breakdowns[0].results;

    const insights: BaseInsightStatisticResponseDto[] = [];

    for (const insight of countriesInsight) {
      const result = new CountryResponseDto();
      result.name = insight.dimensionValues.join("_");
      result.count = insight.value;

      insights.push(result);
    }
    return insights;
  }

  public async getGenderAgeCountries(token: string, igId: string): Promise<GenderAgeCountriesV18Dto> {
    const ages = await this.getFollowersDemographicInsights(token, igId, InstagramV18InsightsEndPathsEnum.age);
    const countries = await this.getFollowersDemographicInsights(token, igId, InstagramV18InsightsEndPathsEnum.country);
    const genders = await this.getFollowersDemographicInsights(token, igId, InstagramV18InsightsEndPathsEnum.gender);
    const genderAges = await this.getFollowersDemographicInsights(
      token,
      igId,
      InstagramV18InsightsEndPathsEnum.genderAge,
    );

    return {
      genders,
      countries,
      ages,
      genderAges,
    };
  }

  public async getMediaImpressionsByMonth(token: string, igId: string): Promise<number> {
    const uri = `${this._baseUrl}${igId}/${this.InsightsImpressionsEndpoint}day?access_token=${token}&since=2023-07-01T07:00:01&until=2023-07-03T07:00:00`;

    const response = await this.sendGetRequest(uri, ImpressionsResponse);
    try {
      return response.data[0].values[0].value ?? 0;
    } catch (_) {
      return 0;
    }
  }

  public async getEngagementAndFollowersCount(
    token: string,
    igId: string,
    igUsername: string,
  ): Promise<[number, number]> {
    const uri = `${this._baseUrl}${igId}?${this.generateEngagementAndNumberFollowersQuery(igUsername, token)}`;
    const response = await this.sendGetRequest(uri, BusinessDiscoveryResponse);

    let numberFollowers = 0;
    let engagement = 0;

    try {
      numberFollowers = response.businessDiscovery.followersCount;
      let totalLikeAndComment = 0;
      for (const item of response.businessDiscovery.media.data) {
        totalLikeAndComment += MathOperationHelper.sumNullableNumbers(item.commentsCount, item.likeCount);
      }

      if (response.businessDiscovery.media.data.length != 0) {
        engagement = totalLikeAndComment / response.businessDiscovery.media.data.length;
      }
    } catch (_) {
      // nothing
    }

    return [engagement, numberFollowers];
  }

  public async getFollowersCount(token: string, igId: string) {
    const uri = `${this._baseUrl}${igId}/${this.InsightsFollowersEndpoint}&period=day&access_token=${token}`;

    const response = await this.sendGetRequest(uri, ImpressionsResponse);

    try {
      return response.data[0].values[0].value ?? 0;
    } catch (_) {
      return 0;
    }
  }

  private;

  private generateEngagementAndNumberFollowersQuery(igUsername: string, token: string) {
    return `fields=business_discovery.username(${igUsername}){followers_count,media{like_count, comments_count, timestamp}}&access_token=${token}`;
  }

  private async sendGetRequest<TResponse>(uri: string, ctor: ClassConstructor<TResponse>): Promise<TResponse> {
    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<unknown>>(this._httpService.get(uri));
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      this._logger.warn("Error near sending FB Graph request\nUri = {U}\nResponse = {R}", uri, e);
      throw new UniHttpException("FB error");
    }
  }
}
