import { Mapper } from "@automapper/core";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import { v4 as uuid } from "uuid";

import { ProjectConfigService } from "src/infrastructure/config/config.service";

import { QuoteResponseDto } from "./../dto/influencer/quote/quote.dto";
import { LoggerService } from "@unistory/nestjs-logger";
import { QuoteRepository } from "src/DAL/repositories/quotes.repository";
import { PaginationQuery } from "src/controllers/queries/pagination.query";
import { QuoteEntity } from "src/DAL/entities/quote.entity";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";
import { QuoteCreateDto } from "src/dto/influencer/quote/quote.create.dto";
import { PlacementRepository } from "src/DAL/repositories/placement.repository";
import { UniHttpException } from "@unistory/nestjs-common";
import { QuoteUpdateDto } from "src/dto/influencer/quote/quote.update.dto";
import { QuoteLogResponseDto } from "src/dto/influencer/quote/quote-log.dto";
import { QuoteLogRepository } from "src/DAL/repositories/quotes-log.repository";
import { ManagerService } from "./manager.service";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { QuoteListRepository } from "src/DAL/repositories/quote-list.repository";
import { QuoteLogListRepository } from "src/DAL/repositories/quotes-log-list.repository";
import { QuoteListEntity } from "src/DAL/entities/quote-list.entity";
import { QuoteListResponseDto } from "src/dto/influencer/quote/quote-list.dto";
import { QuoteLogListEntity } from "src/DAL/entities/quote-log-list.entity";
import { QuoteListCreateDto } from "src/dto/influencer/quote/quote-list-create.dto";
import { QuoteLogEntity } from "src/DAL/entities/quote-log.entity";
import { QuoteLogListResponseDto } from "src/dto/influencer/quote/quote-log-list.dto";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

@Injectable()
export class QuoteService {
  constructor(
    private readonly _repo: QuoteRepository,
    private readonly _listRepo: QuoteListRepository,
    private readonly _logListRepo: QuoteLogListRepository,
    private readonly _logRepo: QuoteLogRepository,

    private readonly _placementRepo: PlacementRepository,
    private readonly _influencerRepo: InfluencerRepository,

    private readonly _managerService: ManagerService,

    @InjectMapper()
    private readonly _mapper: Mapper,
    private readonly _configService: ProjectConfigService,
    private readonly _logger: LoggerService,
  ) {}

  public async getAllList(
    pagination?: PaginationQuery,
    isArchived: boolean = false,
  ): Promise<ICountedItems<QuoteListResponseDto>> {
    const { items: quotes, totalCount } = await this._listRepo.findAll(pagination, isArchived);

    const mappedQuotes = this._mapper.mapArray(quotes, QuoteListEntity, QuoteListResponseDto);

    return {
      totalCount,
      items: mappedQuotes,
    };
  }

  public async getById(id: number): Promise<QuoteEntity> {
    const quote = await this._repo.getById(id);

    if (quote == null) {
      throw new UniHttpException("quote not found!");
    }
    return quote;
  }

  public async getListById(id: number): Promise<QuoteListResponseDto> {
    const list = await this._listRepo.findByIdWithQuotes(id);
    if (list.quotes != null && list.quotes.length > 0) {
      list.quotes.sort((a, b) => a.id - b.id)
    }
    return this._mapper.map(list, QuoteListEntity, QuoteListResponseDto);
  }

  public async getLogById(quoteId: number): Promise<QuoteLogResponseDto> {
    const quote = await this._logRepo.getOneByQuoteId(quoteId);

    return this._mapper.map(quote, QuoteLogEntity, QuoteLogResponseDto);
  }

  public async getOneListLogByListQuoteId(listQuoteId: number): Promise<QuoteLogListResponseDto> {
    const listLog = await this._logListRepo.getOneByQuoteListId(listQuoteId);
    if (listLog.quotesLogs != null && listLog.quotesLogs.length > 0) {
      listLog.quotesLogs.sort((a, b) => a.id - b.id);
    }
    return this._mapper.map(listLog, QuoteLogListEntity, QuoteLogListResponseDto);
  }

  public async create(dto: QuoteCreateDto): Promise<QuoteEntity> {
    const influencer = await this._influencerRepo.getById(dto.influencerId);

    if (influencer == null) {
      throw new UniHttpException("influencer not found", 404);
    }

    if (!(dto.isInstagram || dto.isTiktok || dto.isYoutube)) {
      throw new UniHttpException("choose one ore more platform", 400);
    }

    const quote = new QuoteEntity();

    quote.crossPost = dto.crossPost;
    quote.instaStorySet = dto.instaStorySet;
    quote.linkInBio = dto.linkInBio;

    quote.totalFee = dto.totalFee;
    
    quote.amplificationDigital = dto.amplificationDigital;
    quote.amplificationDigitalMonths = dto.amplificationDigitalMonths;
    quote.amplificationDigitalMonthsRange = dto.amplificationDigitalMonthsRange;

    quote.amplificationTraditional = dto.amplificationTraditional;
    quote.amplificationTraditionalMonths = dto.amplificationTraditionalMonths;
    quote.amplificationDigitalMonthsRange = dto.amplificationTraditionalMonthsRange;

    quote.exclusivity = dto.exclusivity;
    quote.exclusivityMonths = dto.exclusivityMonths;
    quote.exclusivityMonthsRange = dto.exclusivityMonthsRange;

    quote.shootDay = dto.shootDay;
    quote.UGCCreative = dto.UGCCreative;
    quote.paidMedia = dto.paidMedia;

    quote.isInstagram = dto.isInstagram;
    quote.isTiktok = dto.isTiktok;
    quote.isYoutube = dto.isYoutube;

    quote.influencer = influencer;

    await this._repo.save(quote);
    return quote;
  }

  public async createList(dto: QuoteListCreateDto): Promise<number> {
    const quotes: QuoteEntity[] = [];

    for (const quote of dto.quotes) {
      quotes.push(await this.create(quote));
    }

    const list = new QuoteListEntity();
    list.quotes = quotes;

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + this._configService.quoteVerifyTokenLifeTime);

    list.name = dto.name;
    list.brand = dto.brand;

    list.expiredAt = expiredAt;
    list.verifyCode = uuid();

    await this._listRepo.save(list);

    return list.id;
  }

  public async pushToList(quoteListId: number, dto: QuoteCreateDto): Promise<number> {
    const list = await this._listRepo.getById(quoteListId);

    if (list == null) {
      throw new UniHttpException("quote list not found");
    }

    list.quotes.push(await this.create(dto));

    await this._listRepo.save(list);

    return list.id;
  }

  public async setArchived(id: number, isArchived: boolean): Promise<number> {
    const list = await this._listRepo.getById(id);
    list.isArchived = isArchived;

    await this._listRepo.save(list);
    return list.id;
  }

  public async changeVerifyCode(id: number): Promise<number> {
    const list = await this._listRepo.getById(id);
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + this._configService.quoteVerifyTokenLifeTime);

    list.expiredAt = expiredAt;
    list.verifyCode = uuid();

    await this._listRepo.save(list);
    return list.id;
  }
  public async update(id: number, managerId: number, dto: QuoteUpdateDto): Promise<number> {
    const quote = await this._repo.getByIdWithQuoteList(id);

    if (quote == null) {
      throw new UniHttpException("quote not found");
    }

    let logQuote = await this._logRepo.getOneByQuoteId(id);

    if (logQuote == null) {
      logQuote = new QuoteLogEntity();
    }
    logQuote.createdAt = new Date();
    let quoteLogList = await this._logListRepo.getOneByQuoteListId(quote.quoteList.id);

    if (quoteLogList == null) {
      quoteLogList = new QuoteLogListEntity();
    }
    quoteLogList.quoteList = quote.quoteList;
    quoteLogList.brand = quote.quoteList.brand;
    quoteLogList.name = quote.quoteList.name;
    quoteLogList.verifyCode = quote.quoteList.verifyCode;
    quoteLogList.expiredAt = quote.quoteList.expiredAt;

    logQuote.quoteLogList = quoteLogList;

    logQuote.manager = await this._managerService.getOneOrFail(managerId);
    logQuote.quote = quote;

    logQuote.totalFee = quote.totalFee;

    logQuote.crossPost = quote.crossPost;
    logQuote.instaStorySet = quote.instaStorySet;
    logQuote.linkInBio = quote.linkInBio;
    logQuote.amplificationDigital = quote.amplificationDigital;
    logQuote.amplificationDigitalMonths = quote.amplificationDigitalMonths;
    logQuote.amplificationDigitalMonthsRange = quote.amplificationDigitalMonthsRange;

    logQuote.amplificationTraditional = quote.amplificationTraditional;
    logQuote.amplificationTraditionalMonths = quote.amplificationTraditionalMonths;
    logQuote.amplificationDigitalMonthsRange = quote.amplificationTraditionalMonthsRange;

    logQuote.exclusivity = quote.exclusivity;
    logQuote.exclusivityMonths = quote.exclusivityMonths;
    logQuote.exclusivityMonthsRange = quote.exclusivityMonthsRange;

    logQuote.shootDay = quote.shootDay;
    logQuote.UGCCreative = quote.UGCCreative;
    logQuote.paidMedia = quote.paidMedia;

    logQuote.isInstagram = quote.isInstagram;
    logQuote.isTiktok = quote.isTiktok;
    logQuote.isYoutube = quote.isYoutube;

    if (quote == null) {
      throw new UniHttpException("Quote not found!", 400);
    }

    if (dto.influencerId != null) {
      const influencer = await this._influencerRepo.getById(dto.influencerId);
      if (influencer == null) {
        throw new UniHttpException("Placement not found!", 404);
      }
      quote.influencer = influencer;
    }

    if (dto.crossPost != null) {
      quote.crossPost = dto.crossPost;
    }
    if (dto.instaStorySet != null) {
      quote.instaStorySet = dto.instaStorySet;
    }
    if (dto.linkInBio != null) {
      quote.linkInBio = dto.linkInBio;
    }
    if (dto.amplificationDigital != null) {
      quote.amplificationDigital = dto.amplificationDigital;
    }
    if (dto.amplificationDigitalMonths != null) {
      quote.amplificationDigitalMonths = dto.amplificationDigitalMonths;
    }
    if (dto.amplificationDigitalMonthsRange != null) {
      quote.amplificationDigitalMonthsRange = dto.amplificationDigitalMonthsRange;
    }
    if (dto.amplificationTraditional != null) {
      quote.amplificationTraditional = dto.amplificationTraditional;
    }
    if (dto.amplificationTraditionalMonths != null) {
      quote.amplificationTraditionalMonths = dto.amplificationTraditionalMonths;
    }
    if (dto.amplificationTraditionalMonthsRange != null) {
      quote.amplificationTraditionalMonthsRange = dto.amplificationTraditionalMonthsRange;
    }
    if (dto.exclusivity != null) {
      quote.exclusivity = dto.exclusivity;
    }
    if (dto.exclusivityMonths != null) {
      quote.exclusivityMonths = dto.exclusivityMonths ;
    }
    if (dto.exclusivityMonthsRange != null) {
      quote.exclusivityMonthsRange = dto.exclusivityMonthsRange;
    }
    if (dto.shootDay != null) {
      quote.shootDay = dto.shootDay;
    }
    if (dto.UGCCreative != null) {
      quote.UGCCreative = dto.UGCCreative;
    }
    if (dto.paidMedia != null) {
      quote.paidMedia = dto.paidMedia;
    }

    if (dto.totalFee != null) {
      quote.totalFee = dto.totalFee;
    }

    quote.isInstagram = dto.isInstagram;
    quote.isTiktok = dto.isTiktok;
    quote.isYoutube = dto.isYoutube;

    await this._logListRepo.save(quoteLogList);
    await this._repo.save(quote);
    await this._logRepo.save(logQuote);
    return quote.id;
  }

  public async delete(id: number): Promise<number> {
    const quote = await this._repo.getById(id);
    if (quote == null) {
      throw new UniHttpException("Quote not found!", 400);
    }

    await this._repo.remove(quote);
    return quote.id;
  }

  public async getOneListByVerifyCode(verifyCode: string): Promise<QuoteListResponseDto> {
    const quoteList = await this._listRepo.getOneByVerifyCode(verifyCode);
    if (quoteList == null) {
      throw new UniHttpException("Quote not found!");
    }
    const mappedQuoteList = this._mapper.map(quoteList, QuoteListEntity, QuoteListResponseDto);

    for (const quote of mappedQuoteList.quotes) {
      if (quote.isInstagram) {
        quote.talentFee = (await this._placementRepo.getByInfluencerIdAndType(quote.influencer.id, PlacementType.INSTAGRAMM)).talantFee
      }
      if (quote.isTiktok) {
        quote.talentFee = (await this._placementRepo.getByInfluencerIdAndType(quote.influencer.id, PlacementType.TIKTOK)).talantFee
      }
      if (quote.isYoutube) {
        quote.talentFee = (await this._placementRepo.getByInfluencerIdAndType(quote.influencer.id, PlacementType.YOUTUBE)).talantFee
      }
    }

    return mappedQuoteList
  }
}
