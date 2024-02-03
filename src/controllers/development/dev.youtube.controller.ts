import { ApiExcludeController } from '@nestjs/swagger';
import { Controller, Get, Post, Param, Body, ParseIntPipe, Delete } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { YoutubeService } from "src/services/youtube.service";
import { YoutubeTokenCreateDto } from "src/dto/youtube/youtube.create.token.dto";

@Controller("dev-youtube")
@ApiExcludeController()
export class DevYoutubeController {
  constructor(
    private readonly _service: YoutubeService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get("")
  public async getAll() {
    return await this._service.getAll();
  }

  @Get("insights")
  public async getAllInsights() {
    return await this._service.getAllInsights();
  }

  @Delete("delete-insight:insightId")
  public async deleteInsight(@Param("insightId", ParseIntPipe) insightId: number): Promise<void> {
    await this._service.deleteInsight(insightId);
  }

  @Post(":influencerId/sign-in-by-hands")
  public async signInByHands(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @Body() dto: YoutubeTokenCreateDto,
  ): Promise<void> {
    return await this._service.signInByHands(influencerId, dto);
  }

  @Get(":influencerId/set-default-insight")
  public async setDefaultInsight(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<void> {
    await this._service.setDefaultInsight(influencerId);
  }

  @Delete(":influencerId/delete-insight")
  public async deleteInsightByInfluencerId(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<void> {
    await this._service.deleteInsightByInfluencerId(influencerId);
  }
}
