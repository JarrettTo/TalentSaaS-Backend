import { Controller, UseGuards, Get, Post, Param, Body, ParseIntPipe, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { TiktokService } from "src/services/tiktok.service";
import { TiktokAuthDto } from "src/dto/tiktok/tiktok.auth.dto";
import { TiktokAllStatisticsResponseDto } from "src/dto/tiktok/response/tiktok.all.statistics.response.dto";
import { GetUser } from "src/infrastructure/decorator";
import { TiktokBusinessService } from "src/services/tiktok-buisness.service";
import {
  TiktokBusinessBaseInsightResponseDto,
  TiktokBusinessInsightResponseDto,
} from "src/dto/tiktok/response/buisiness/tiktok-business.insight.response.dto";

@Controller("tiktok-business")
@ApiTags("tiktok-business")
export class TiktokBusinessController {
  constructor(
    private readonly _service: TiktokBusinessService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Post(":influencerId/sign-in")
  @ApiOperation({summary: "get business tiktok jwt tokens by auth token"})
  @ApiOkResponse()
  public async signIn(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dto: TiktokAuthDto,
  ): Promise<void> {
    await this._service.signIn(dto, influencerId);
  }

  @Get(":influencerId/auth-link")
  @ApiOperation({summary: "get tiktok jwt tokens by auth token"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: String })
  public async sendAuthEmailLink(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<string> {
    return await this._service.generateAuthEmailLink(influencerId);
  }

  @Post(":influencerId/statistic")
  @ApiOperation({summary: "get business tiktok statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TiktokBusinessBaseInsightResponseDto })
  public async findAllStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TiktokBusinessBaseInsightResponseDto> {
    return await this._service.getBusinessInsights(influencerId);
  }

  @Get(":influencerId/local-statistic")
  @ApiOperation({summary: "get business local tiktok statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TiktokBusinessInsightResponseDto })
  public async findAllLocalStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TiktokAllStatisticsResponseDto> {
    return await this._service.getAllLocalStatistics(influencerId);
  }

  @Get(":influencerId/local-log-statistic")
  @ApiOperation({summary: "get business local log tiktok statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TiktokBusinessInsightResponseDto })
  public async findAllLocalLogStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TiktokAllStatisticsResponseDto[]> {
    return await this._service.getAllLogStatistics(influencerId);
  }
  @Post(":influencerId/local-statistic")
  @ApiOperation({summary: "update business local tiktok statistic from business tiktok"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TiktokBusinessInsightResponseDto })
  public async updateLocalStatistic(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @GetUser("id") managerId: number,
  ) {
    await this._service.updateLogStatistic(influencerId, managerId);
    await this._service.updateLocalDbStatistic(influencerId);
  }
}
