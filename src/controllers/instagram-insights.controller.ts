import { UniDecorators } from "@unistory/route-decorators";
import { AuthGuard } from "@nestjs/passport";

import { InstagramInsightsService } from "src/services/instagram-insights.service";
import { Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { InfluencerInsightsDto } from "src/dto/facebook/influencer-insights.dto";
import { FacebookGraphService } from "src/services/facebook-graph.service";
import { InfluencerInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-insights.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { GetUser } from "src/infrastructure/decorator";
import { InfluencerLogInsightsV18Dto } from "src/dto/facebook/graph/v18/influencer-log-insights.dto";

@UniDecorators.Controller("instagram")
@ApiBearerAuth("access-token")
export class InstagramInsightsController {
  public constructor(private readonly _service: InstagramInsightsService) {}

  @UniDecorators.Get(":influencerId", "Get insights by influencer", false, InfluencerInsightsV18Dto)
  @ApiOperation({summary: "get insights by influencer from instagram"}) 
  @UseGuards(AuthGuard())
  public async getInsights(@Param("influencerId", ParseIntPipe) id: number): Promise<InfluencerInsightsV18Dto> {
    return this._service.getInfluencerInsights(id);
  }

  @UniDecorators.Get(":influencerId/local-statistic", "Get local insights by influencer", false, InfluencerInsightsV18Dto)
  @ApiOperation({summary: "Get insights by influencer locally"}) 
  @UseGuards(AuthGuard())
  public async getLocalInsights(@Param("influencerId", ParseIntPipe) id: number): Promise<InfluencerInsightsV18Dto> {
    return this._service.getInfluencerLocalInsights(id);
  }

  @UniDecorators.Post(":influencerId/local-statistic", "update local insights", false, InfluencerInsightsV18Dto)
  @ApiOperation({summary: "Update local insights from instagram"}) 
  @UseGuards(AuthGuard())
  public async updateLocalInsights(
    @Param("influencerId", ParseIntPipe) id: number,
    @GetUser("id") managerId: number,
  ): Promise<void> {
    await this._service.updateLogStatistic(id, managerId);
    return await this._service.updateLocalDbStatistic(id);
  }

  @UniDecorators.Get(":influencerId/local-log-statistic", "", false, InfluencerLogInsightsV18Dto)
  @ApiOperation({summary: "get local log insights from instagram"}) 
  @UseGuards(AuthGuard())
  public async findAllLocalLogStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<InfluencerLogInsightsV18Dto> {
    return await this._service.getAllLocalStatistics(influencerId);
  }

  @UniDecorators.Get(
    ":influencerId/unauthorized/:verifyCode/",
    "Get insights by influencer for unauthorized user",
    false,
    InfluencerInsightsV18Dto,
  )
  @ApiOperation({summary: "Get insights by influencer for unauthorized user"}) 
  public async getInsightsForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) id: number,
    @Param("verifyCode") verifyCode: string,
  ): Promise<InfluencerInsightsV18Dto> {
    return await this._service.getInsightsForUnauthorizedUser(id, verifyCode);
  }

  @UniDecorators.Get(":influencerId/:postId", "Get insights by influencer's post id", false, InfluencerInsightsV18Dto)
  @ApiOperation({summary: "Get insights by influencer's post id"}) 
  public async getInsightsByPost(
    @Param("influencerId", ParseIntPipe) id: number,
    @Param("postId", ParseIntPipe) postId: string,
  ): Promise<InfluencerInsightsV18Dto> {
    return await this._service.getInfluencerInsightsByPostId(id, postId);
  }
}
