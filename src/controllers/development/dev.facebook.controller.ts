import { FacebookTokenService } from "src/services/facebook-token.service";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";

import { CreateFacebookTokenDto } from "src/dto/facebook/facebook-token.create.dto";
import { FacebookTokenRepository } from "src/DAL/repositories/facebook-token.repository";
import { FacebookToken } from "src/DAL/entities/facebook-token.entity";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller("dev-facebook")
@ApiExcludeController()
export class DevFacebookController {
  public constructor(
    private readonly _facebookTokenService: FacebookTokenService,
    private readonly _facebookTokenRepo: FacebookTokenRepository,
  ) {}

  @Post(":influencerId/register-by-hands")
  public async registerByHands(
    @Param("influencerId") influencerId,
    @Body() createTokenDto: CreateFacebookTokenDto,
  ): Promise<void> {
    await this._facebookTokenService.registerByHands(influencerId, createTokenDto);
  }

  @Get(":influencerId/set-default-insight")
  public async setDefaultInsight(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<void> {
    await this._facebookTokenService.setDefaultInsight(influencerId);
  }

  @Get("facebook-tokens")
  public async getAllFacebookTokens(): Promise<FacebookToken[]> {
    return await this._facebookTokenRepo.getAll();
  }
}
