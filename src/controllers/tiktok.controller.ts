import { Controller, UseGuards, Get, Post, Param, Body, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { ApiAcceptedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { TiktokService } from "src/services/tiktok.service";
import { TiktokAuthDto } from "src/dto/tiktok/tiktok.auth.dto";
import { TiktokAllStatisticsResponseDto } from "src/dto/tiktok/response/tiktok.all.statistics.response.dto";
import { TikTokBaseUserResponseDto } from "src/dto/tiktok/response/tiktok.user-info.response.dto";
import { TikTokVideoStatisticResponseDto } from "src/dto/tiktok/response/tiktok.video-statisic.response.dto";
import { TikTokMainStatisticResponseDto } from "src/dto/tiktok/response/tiktok.main-statistic.response.dto";
import { TikTokLogStatisticResponseDto } from "src/dto/tiktok/response/tiktok.log-statistic.response.dto";
import { GetUser } from "src/infrastructure/decorator";

import { TiktokBusinessService } from "src/services/tiktok-buisness.service";
import { TiktokInsightsEntity } from "src/DAL/entities/tiktok/tiktok.insights.entity";
import { DateRequestDto } from "src/dto/youtube/request.date.dto";
import { TikTokeVideoListResponseDto } from "src/dto/tiktok/response/tiktok.video-list.response.dto";
import { TikTokBaseVideoResponseDto } from "src/dto/tiktok/response/tiktok.video.base-response.dto";
import { TikTokProfilePictureResponseDto } from "src/dto/tiktok/response/tiktok.prof-pic.response.dto";

@Controller("tiktok")
@ApiTags("tiktok")
export class TiktokController {
  constructor(
    private readonly _service: TiktokService,
    private readonly _businessService: TiktokBusinessService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get(":influencerId/auth-link")
  @ApiOperation({summary: "get tiktok jwt tokens by auth token"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: String })
  public async sendAuthEmailLink(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<string> {
    return await this._service.generateAuthEmailLink(influencerId);
  }

  @Post(":influencerId/sign-in")
  @ApiOperation({summary: "get link to auth in tiktok"})
  @ApiOkResponse()
  public async signIn(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dto: TiktokAuthDto,
  ): Promise<void> {
    await this._service.signIn(influencerId, dto);
  }

  @Post(":influencerId/base-statistic")
  @ApiOperation({summary: "get base statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokMainStatisticResponseDto })
  public async findAllStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TikTokMainStatisticResponseDto> {
    return await this._service.getBaseStatistic(influencerId);
  }

  @Post(":influencerId/prof-pic")
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokProfilePictureResponseDto })
  public async getProfPic(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TikTokProfilePictureResponseDto> {
    return await this._service.getProfilePicture(influencerId);
  }

  @Get(":influencerId/local-statistic")
  @ApiOperation({summary: "get local statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TiktokAllStatisticsResponseDto })
  public async findAllLocalStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TiktokAllStatisticsResponseDto> {
    return await this._businessService.getAllLocalStatistics(influencerId);
  }

  @Get(":influencerId/log-statistic")
  @ApiOperation({summary: "get local log statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokLogStatisticResponseDto, isArray: true })
  public async findAllLogStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TikTokLogStatisticResponseDto[]> {
    return await this._businessService.getAllLogStatistics(influencerId);
  }

  @Post(":influencerId/local-statistic")
  @ApiOperation({summary: "update local statistic"})
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  public async updateLocalStatistics(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @GetUser("id") managerId: number,
  ): Promise<void> {
    await this._service.updateLogStatistic(influencerId, managerId);
    await this._service.updateLocalDbStatistic(influencerId);

    const businessTokens = await this._businessService.getTokens(influencerId);
    console.log()
    if (businessTokens != null) {
      await this._businessService.updateLogStatistic(influencerId, managerId);
      await this._businessService.updateLocalDbStatistic(influencerId);
    }
  }

  @Post(":influencerId/top-videos/:top")
  @ApiOperation({summary: "get top video list"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokVideoStatisticResponseDto })
  public async findTopVideosStatistic(
    @Param("top", ParseIntPipe) top: number,
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TikTokVideoStatisticResponseDto> {
    return await this._service.getTopVideosStatistic(influencerId, top);
  }

  @Post(":influencerId/videos/:videoId")
  @ApiOperation({summary: "get statistic by video id"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokBaseVideoResponseDto })
  public async findVideoStatistic(
    @Param("videoId") videoId: string,
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<TikTokBaseVideoResponseDto> {
    return await this._service.getVideoStatistic(influencerId, videoId);
  }

  @Delete(":influencerId/delete-token")
  @ApiOperation({summary: "sign out influencer's tiktok"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async deleteToken(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<number> {
    return await this._service.deleteToken(influencerId);
  }

  @Post(":influencerId/video-list")
  @ApiOperation({summary: "get video list from local db"})
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: TikTokeVideoListResponseDto })
  @ApiAcceptedResponse({ type: TikTokeVideoListResponseDto })
  public async videoList(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dateDto: DateRequestDto,
  ): Promise<TikTokeVideoListResponseDto> {
    return await this._service.getLocalVideos(influencerId, dateDto.from, dateDto.to);
  }

  @Put(":influencerId/video-list")
  @ApiOperation({summary: "update video list in local db from tiktok"})
  @UseGuards(AuthGuard())
  public async updateLocalVideoList(
    @Param("influencerId", ParseIntPipe) influencerId: number,
  ): Promise<void> {
    return await this._service.updateLocalVideoList(influencerId);
  }

  @Get(":influencerId/unauthorized/statistic/:verifyCode")
  @ApiOperation({summary: "get all statistic by verify code for unauthorized user"})
  @ApiOkResponse({ type: TiktokAllStatisticsResponseDto })
  public async findAllStatisticsForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Param("verifyCode") verifyCode: string,
  ): Promise<TiktokAllStatisticsResponseDto> {
    return await this._service.getAllStatisticsForUnauthorizedUser(influencerId, verifyCode);
  }

  @Post(":influencerId/unauthorized/video-list/:verifyCode")
  @ApiOperation({summary: "get video list  by verify code for unauthorized user"})
  @ApiOkResponse({ type: TikTokeVideoListResponseDto })
  public async findVideoListForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Param("verifyCode") verifyCode: string,
    @Body() dateDto: DateRequestDto,
  ): Promise<TikTokeVideoListResponseDto> {
    return await this._service.getVideoListForUnauthorizedUser(influencerId, verifyCode, dateDto.from, dateDto.to);
  }

}
