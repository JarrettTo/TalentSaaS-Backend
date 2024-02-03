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
  Patch,
} from "@nestjs/common";
import { Response } from "express";

import {
  ApiBody,
  ApiConsumes,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { InfluencerCreateDto } from "src/dto/influencer/influencer.create.dto";
import { InfluencerService } from "src/services/influencer.service";
import { ImageFilesInterceptor } from "src/infrastructure/middlewares/interceptors/image-files.interceptor";
import { InfluencerDto } from "src/dto/influencer/influencer.dto";
import { InfluencerGroupResponseDto } from "src/dto/influencer/group/influencer-group.response.dto";
import { InfluencerGroupService } from "src/services/influencer-group.service";
import { SortQuery } from "./queries/influencers/sort.query";
import { GetUser } from "src/infrastructure/decorator";
import { StructuredDataFilesInterceptor } from "src/infrastructure/middlewares/interceptors/structured-data-files.interceptor";
import { PlacementLogResponseDto } from "src/dto/influencer/placement/placement-log.response.dto";
import { PlacementResponseDto } from "src/dto/influencer/placement/placement.response.dto";
import { PlacementUpdateDto } from "src/dto/influencer/placement/placement.update.dto";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { QueryRequired } from "src/infrastructure/decorator/query-required";
import { PlacementLastLogResponseDto } from "src/dto/influencer/placement/placement-last-log.response.dto";
import { StrategyCreateDto } from "src/dto/influencer/strategy.create.dto";
import { StrategyDto } from "src/dto/influencer/strategy.dto";

@Controller("influencer")
@ApiTags("Influencer")
export class InfluencerController {
  constructor(
    private readonly _service: InfluencerService,
    private readonly _groupService: InfluencerGroupService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get("all-active")
  @ApiOperation({summary: "getting all active influencers with query-sorting"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [InfluencerDto] })
  public async findAllActive(@Query() sort?: SortQuery): Promise<InfluencerDto[]> {
    return await this._service.getAllActive(sort);
  }

  @Get("all-archived")
  @ApiOperation({summary: "getting all archived influencers with query-sorting"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [InfluencerDto] })
  public async findAllArchived(): Promise<InfluencerDto[]> {
    return await this._service.getAllArchived();
  }

  @Get("placements")
  @ApiOperation({summary: "getting all placements with sorting by placements's type"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [PlacementResponseDto] })
  public async findAllPlacements(): Promise<PlacementResponseDto[]> {
    return await this._service.getAllPlacements();
  }

  @Get("placements/:influencerId/")
  @ApiOperation({summary: "getting all placements with sorting by placements's type by influencer id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [PlacementResponseDto] })
  public async findAllPlacementsByInfluencerId(@Param("influencerId", ParseIntPipe) id: number,): Promise<PlacementResponseDto[]> {
    
    return await this._service.getAllPlacementsByInfluencerId(id);
  }

  @Get("placements-log")
  @ApiOperation({summary: "getting all placement's logs with sorting by placements's type"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [PlacementLogResponseDto] })
  public async findAllLogPlacements(): Promise<PlacementLogResponseDto[]> {
    return await this._service.getAllLogPlacements();
  }

  @Get("placements-last-logs")
  @ApiOperation({summary: "getting last placement's logs with sorting by placements's type"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [PlacementLastLogResponseDto] })
  public async findAllLastPlacementsLogs(): Promise<PlacementLastLogResponseDto[]> {
    return await this._service.getAllLastPlacementsLogs();
  }

  @Get("placements-log/:influencerId")
  @ApiOperation({summary: "getting all placement's logs with sorting by placements's type by influencer id"}) 
  @UseGuards(AuthGuard())
  @ApiQuery({name: "type", description: "Placement type", required: true})
  @ApiOkResponse({ type: PlacementLogResponseDto })
  public async findLogPlacementsByInfluencerId(
    @Param("influencerId", ParseIntPipe) id: number,
    @QueryRequired("type") type: PlacementType,
  ): Promise<PlacementLogResponseDto> {
    return await this._service.getLogPlacementsByInfluencerId(id, type);
  }

  @Get("groups")
  @ApiOperation({summary: "getting all influencer's groups"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: [InfluencerGroupResponseDto] })
  public async findAllGroups(): Promise<InfluencerGroupResponseDto[]> {
    return await this._groupService.findAll();
  }

  @Delete("groups/:id")
  @ApiOperation({summary: "delete group by id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  public async deleteGroup(@Param("id") id: number): Promise<void> {
    return await this._groupService.delete(id);
  }

  @Get(":influencerId/unauthorized/:verifyCode")
  @ApiOperation({summary: "get influencer  by id for unauthorized by verify code"}) 
  public async getInfluencerForUnauthorizedUser(
    @Param("influencerId", ParseIntPipe) id: number,
    @Query("verifyCode") verifyCode: string,
  ): Promise<InfluencerDto> {
    return await this._service.getOneOrFailForUnauthorizedUser(id, verifyCode);
  }

  @Get(":id")
  @ApiOperation({summary: "get one influencer by id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: InfluencerDto })
  public async findOne(@Param("id", ParseIntPipe) influencerId: number): Promise<InfluencerDto> {
    return await this._service.getOneOrFailMapped(influencerId);
  }

  @Delete(":id")
  @ApiOperation({summary: "delete influencer by id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async delete(@Param("id", ParseIntPipe) influencerId: number): Promise<number> {
    return await this._service.deleteOne(influencerId);
  }

  @Post("")
  @ApiOperation({summary: "add influencer"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async create(@Body() dto: InfluencerCreateDto): Promise<number> {
    const influencer = await this._service.create(dto);
    return influencer.id;
  }

  @Put(":id")
  @ApiOperation({summary: "update influencer by id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async update(@Param("id", ParseIntPipe) id: number, @Body() dto: InfluencerCreateDto): Promise<number> {
    const influencer = await this._service.update(id, dto);
    return influencer.id;
  }
  @Put("/strategy/update/:id")
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async strategy_update(@Param("id", ParseIntPipe) id: number, @Body() dto: StrategyCreateDto): Promise<number> {
    const strategy = await this._service.updateStrategy(id, dto);
    return strategy.id;
  }

  @Post("/strategy/insert")
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async strategy_insert( @Body() dto: StrategyCreateDto): Promise<number> {
    const strategy = await this._service.insertStrategy( dto);
    return strategy.id;
  }
  
  @Get("/strategy/:id")
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async strategy_get(@Param("id", ParseIntPipe) id: number): Promise<StrategyDto> {
    const strategy = await this._service.getOneStrategyOrFailMapped(id);
    return strategy;
  }

  @Get("/strategy/all/:id")
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async strategy_get_all(@Param("id", ParseIntPipe) id: number): Promise<StrategyDto[]> {
    const strategy = await this._service.getAllStrategiesOrFailMapped(id);
    return strategy;
  }

  @Patch("placements/:influencerId")
  @ApiOperation({summary: "update influencer's placement"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async updatePlacement(
    @Param("influencerId", ParseIntPipe) influencerId: number,
    @GetUser("id", ParseIntPipe) managerId: number,
    @Body() dto: PlacementUpdateDto,
  ): Promise<void> {
    await this._service.updatePlacement(influencerId, managerId, dto);
  }

  @Post(":influencerId/statistic-verify-code/generate")
  @ApiOperation({summary: "generate verify code to getting influencer data for unauthorized"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  public async generateStatisticVerifyCode(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<string> {
    return await this._service.generateStatisticVerifyCode(influencerId);
  }

  @Get(":id/-change-archiving")
  @ApiOperation({summary: "make the influencer active/archived"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Boolean })
  public async changeArchiving(@Param("id", ParseIntPipe) influencerId: number): Promise<boolean> {
    return await this._service.changeArchiving(influencerId);
  }

  @Post("set-avatar/:id/")
  @ApiOperation({summary: "upload influencer's avatar"}) 
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBody({ description: "One File. Field - avatar. Type - file" })
  @UseInterceptors(ImageFilesInterceptor([{ name: "avatar", maxCount: 1 }]))
  public async setAvatar(
    @Param("id", ParseIntPipe) influencerId: number,
    @UploadedFiles() files: { avatar?: Express.Multer.File },
  ): Promise<void> {
    return await this._service.setAvatar(influencerId, files.avatar[0]);
  }

  @Get("csv/generate/")
  @ApiOperation({summary: "download csv with influencer's data"}) 
  // @UseGuards(AuthGuard())
  @Header("Content-type", "text/csv")
  public async generateCsv(
    @Res() res: Response,
    @Query("ids", new ParseArrayPipe({ items: Number, separator: "," })) ids: number[],
  ): Promise<void> {
    const csv = await this._service.getCsv(ids);
    const buff = Buffer.from(csv, "utf-8");

    res.status(HttpStatus.ACCEPTED).send(buff);
  }

  @Post("csv/generate-placements/")
  @ApiOperation({summary: "generate placements from rate's csv (from google tables)"}) 
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBody({ description: "One File. Field - csv. Type - file" })
  @UseInterceptors(StructuredDataFilesInterceptor([{ name: "placements", maxCount: 1 }]))
  @ApiExcludeEndpoint()
  public async generatePlacementFromCsV(@UploadedFiles() files: { placements?: Express.Multer.File }): Promise<void> {
    return await this._service.generatePlacementFromCsV(files.placements[0]);
  }
}
