import {
  Get,
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  Put,
  Delete,
  Query,
  ParseArrayPipe,
  Header,
  Res,
  Req,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

import { ApiBody, ApiConsumes, ApiExcludeController, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { FacebookTokenRepository } from "src/DAL/repositories/facebook-token.repository";
import { InfluencerService } from "src/services/influencer.service";

@Controller("dev-influencer")
@ApiExcludeController()
export class DevInfluencerController {
  constructor(
    private readonly _facebookTokenRepo: FacebookTokenRepository,
    private readonly _service: InfluencerService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get("backup/tokens")
  public async getAllTokens() {
    return await this._service.getBackupTokens();
  }

  @Get("test")
  public async test() {
    return "test5"
  }
}
