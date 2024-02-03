import { ApiExcludeController } from "@nestjs/swagger";
import { Controller, Get, Post, Param, Body, ParseIntPipe, Delete } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { YoutubeService } from "src/services/youtube.service";
import { YoutubeTokenCreateDto } from "src/dto/youtube/youtube.create.token.dto";
import { TiktokTokenRepository } from "src/DAL/repositories/tiktok-token.repository";
import { TiktokTokenEntity } from "src/DAL/entities/tiktok-token.entity";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";

@Controller("dev-tiktok")
@ApiExcludeController()
export class DevTikTokController {
  constructor(
    private readonly _tokenRepos: TiktokTokenRepository,
    private readonly _influencerRepo: InfluencerRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Post(":influencerId/register-rostik")
  public async getAll(@Param("influencerId", ParseIntPipe) influencerId: number) {    
    const token = new TiktokTokenEntity();
    token.accessToken = "act.kUIcXe96pSiBHKzhi2mdKeMnFgfI509kvnWV0M0wETFAIf1tnWtywghelJj2!6114.va";
    token.refreshToken = "rft.9ECoGQPt1uo7J4LvES9lHj3xKlYZGnLMOmj4rtkO96rZZ2ypW4cCF1Kt8GNn!6097";
    token.influencer = await this._influencerRepo.getById(influencerId);

    await this._tokenRepos.save(token);
  }
}
