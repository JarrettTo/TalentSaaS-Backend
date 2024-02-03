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
  Patch,
} from "@nestjs/common";

import { ApiAcceptedResponse, ApiOperation, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { QuoteService } from "src/services/quotes.service";
import { PaginationQuery } from "./queries/pagination.query";
import { QuoteResponseDto } from "src/dto/influencer/quote/quote.dto";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";
import { QuoteCreateDto } from "src/dto/influencer/quote/quote.create.dto";
import { QuoteUpdateDto } from "src/dto/influencer/quote/quote.update.dto";
import { QuoteLogResponseDto } from "src/dto/influencer/quote/quote-log.dto";
import { GetUser } from "src/infrastructure/decorator";
import { QuoteListResponseDto } from "src/dto/influencer/quote/quote-list.dto";
import { QuoteLogListResponseDto } from "src/dto/influencer/quote/quote-log-list.dto";
import { QuoteListCreateDto } from "src/dto/influencer/quote/quote-list-create.dto";

@Controller("quote")
@ApiTags("quote")
export class QuoteController {
  constructor(
    private readonly _service: QuoteService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get("")
  @ApiOperation({summary: "getting all active quote"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: ICountedItems<QuoteListResponseDto> })
  @ApiAcceptedResponse({ type: QuoteListResponseDto })
  public async findAllList(@Query() pagination?: PaginationQuery): Promise<ICountedItems<QuoteListResponseDto>> {
    return await this._service.getAllList(pagination);
  }

  @Get("archived")
  @ApiOperation({summary: "getting all archive quote"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: ICountedItems<QuoteListResponseDto> })
  @ApiAcceptedResponse({ type: QuoteResponseDto })
  public async findAllArchivedList(@Query() pagination?: PaginationQuery): Promise<ICountedItems<QuoteListResponseDto>> {
    return await this._service.getAllList(pagination, true);
  }

  @Get(":id")
  @ApiOperation({summary: "get quote by id"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: QuoteListResponseDto })
  public async findOneList(@Param("id") id: number): Promise<QuoteListResponseDto> {
    return await this._service.getListById(id);
  }

  @Get(":listQuoteId/log")
  @ApiOperation({summary: "get quote's log list by listQuoteId"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: QuoteListResponseDto })
  public async findOneLogList(@Param("listQuoteId") listQuoteId: number): Promise<QuoteLogListResponseDto> {
    return await this._service.getOneListLogByListQuoteId(listQuoteId);
  }

  @Post("")
  @ApiOperation({summary: "add quote"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async create(@Body() dto: QuoteListCreateDto): Promise<number> {
    return await this._service.createList(dto);
  }

  @Patch(":id")
  @ApiOperation({summary: "update quote"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: QuoteUpdateDto,
    @GetUser("id", ParseIntPipe) managerId: number,
  ): Promise<number> {
    return await this._service.update(id,managerId, dto);
  }

  @Patch(":id/set-archived")
  @ApiOperation({summary: "make the quote active/archived"}) 
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: Number })
  public async setArchived(
    @Param("id", ParseIntPipe) id: number,
    @Query("isArchived") isArchived: boolean
  ): Promise<number> {
    return await this._service.setArchived(id, isArchived);
  }

  @Get("unauthorized/:verifyCode")
  @ApiOperation({summary: "get quote list for unauthorized by verify code"}) 
  @ApiOkResponse({ type: QuoteListResponseDto })
  public async findOneListByVerifyCode(@Param("verifyCode") verifyCode: string): Promise<QuoteListResponseDto> {
    return await this._service.getOneListByVerifyCode(verifyCode);
  }
}
