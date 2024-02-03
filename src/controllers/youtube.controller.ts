import { Controller, UseGuards, Get, Post, Param, Body, ParseIntPipe, Delete, Query } from "@nestjs/common";
import { ApiAcceptedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { YoutubeService } from "src/services/youtube.service";
import { DateRequestDto } from "src/dto/youtube/request.date.dto";
import { YoutubeAllStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.statistics.response.dto";
import { YoutubeAuthDto } from "src/dto/youtube/youtube.auth.dto";
import { YoutubeTokenCreateDto } from "src/dto/youtube/youtube.create.token.dto";
import { YoutubeOneStatisticsResponseDto } from "src/dto/youtube/response/youtube.one.statistics.response.dto";
import { GetUser } from "src/infrastructure/decorators/get-user.decorator";
import { YoutubeAllLogStatisticsResponseDto } from "src/dto/youtube/response/youtube.all.log-statistics.response.dto";
import { YoutubeVideoStatisticResponseDto } from "src/dto/youtube/response/youtube.video-statistic.response.dto";
import { YoutubeVideoListResponseDto } from "src/dto/youtube/response/youtube.video-list.response.dto";

@Controller("youtube")
@ApiTags("YouTube")
export class YoutubeController {
  constructor(
    private readonly _service: YoutubeService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Post(":influencerId/video-list")
  @ApiOperation({summary: "get video list"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeVideoListResponseDto })
  @ApiAcceptedResponse({ type: YoutubeVideoStatisticResponseDto })
  public async videoList(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dateDto: DateRequestDto,
  ): Promise<YoutubeVideoListResponseDto> {
    return await this._service.getVideoList(influencerId, dateDto.from, dateDto.to);
  }

  @Get(":influencerId/auth-link")
  @ApiOperation({summary: "get link to auth in youtube"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: String })
  public async sendAuthEmailLink(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<string> {
    return await this._service.sendAuthEmailLink(influencerId);
  }

  @Post(":influencerId/sign-in")
  @ApiOperation({summary: "get youtube jwt tokens by auth token"})
  @ApiOkResponse()
  public async signIn(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dto: YoutubeAuthDto,
  ): Promise<void> {
    return await this._service.signIn(influencerId, dto);
  }

  @Delete(":influencerId/delete-token")
  @ApiOperation({summary: "sign out influencer's youtube"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async deleteYoutubeToken(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<number> {
    return await this._service.deleteYoutubeToken(influencerId);
  }

  @Post(":influencerId/statistic")
  @ApiOperation({summary: "sign all statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeAllStatisticsResponseDto })
  public async findAllStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dateDto: DateRequestDto,
  ): Promise<YoutubeAllStatisticsResponseDto> {
    return await this._service.getAllStatistics(influencerId, dateDto.from, dateDto.to);
  }
  @Post(":influencerId/videos/:videoId")
  @ApiOperation({summary: "sign video statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeAllStatisticsResponseDto })
  public async getVideos(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Param("videoId") videoId: string,
  ): Promise<YoutubeVideoStatisticResponseDto> {
    return await this._service.getVideoStatistic(influencerId, videoId);
  }

  @Get(":influencerId/local-statistic")
  @ApiOperation({summary: "get local statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeAllStatisticsResponseDto })
  public async findAllLocalStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<YoutubeAllStatisticsResponseDto> {
    return await this._service.getAllLocalStatistics(influencerId);
  }

  @Get(":influencerId/local-log-statistic")
  @ApiOperation({summary: "get local log statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeAllLogStatisticsResponseDto })
  public async findAllLocalLogStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<YoutubeAllLogStatisticsResponseDto[]> {
    return await this._service.getAllLogStatistics(influencerId);
  }
  @Post(":influencerId/local-statistic")
  @ApiOperation({summary: "update local statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeAllStatisticsResponseDto })
  public async updateLocalStatistic(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @GetUser("id") managerId: number,
  ) {
    await this._service.updateLogStatistic(influencerId, managerId);
    await this._service.updateLocalDbStatistic(influencerId);
  }

  @Post(":influencerId/statistic/one/:videoId")
  @ApiOperation({summary: "get one video statistic by video id"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: YoutubeOneStatisticsResponseDto })
  public async findOneStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dateDto: DateRequestDto,
    @Param("videoId") videoId: string,
  ): Promise<YoutubeOneStatisticsResponseDto> {
    return await this._service.getOneStatistics(influencerId, dateDto.from, dateDto.to, videoId);
  }

  @Post(":influencerId/unauthorized/statistic/:verifyCode")
  @ApiOperation({summary: "get all statistic by verify code for unauthorized user "})
  @ApiOkResponse({ type: YoutubeAllStatisticsResponseDto })
  public async findAllStatisticsForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Param("verifyCode") verifyCode: string,
    @Body() dateDto: DateRequestDto,
  ): Promise<YoutubeAllStatisticsResponseDto> {
    return await this._service.getAllStatisticsForUnauthorizedUser(influencerId, dateDto.from, dateDto.to, verifyCode);
  }

  @Post(":influencerId/unauthorized/video-list/:verifyCode")
  @ApiOperation({summary: "get video list by verify code for unauthorized user "})
  @ApiOkResponse({ type: YoutubeVideoListResponseDto })
  public async findVideListForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Param("verifyCode") verifyCode: string,
    @Body() dateDto: DateRequestDto,
  ): Promise<YoutubeVideoListResponseDto> {
    return await this._service.getVideoListForUnauthorizedUser(influencerId, dateDto.from, dateDto.to, verifyCode);
  }
}
