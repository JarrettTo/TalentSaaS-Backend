import { Mapper } from "@automapper/core";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import * as fs from "fs";
import * as fastCsv from "fast-csv";
import { v4 as uuid } from "uuid";
import { parse } from "json2csv";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { InfluencerCreateDto } from "src/dto/influencer/influencer.create.dto";
import { InfluencerEntity } from "src/DAL/entities/influencer.entity";
import { ManagerService } from "src/services/manager.service";
import { InfluencerDto } from "src/dto/influencer/influencer.dto";
import { PlacementRepository } from "src/DAL/repositories/placement.repository";

import { PlacementEntity } from "src/DAL/entities/placement.entity";
import { InfluencerUniqueFieldsDto } from "src/dto/influencer/influencer-unique-fields.dto";
import { PlacementTokenRepository } from "src/DAL/repositories/placement-token.repository";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { InfluencerStatisticVerifyTokenEntity } from "src/DAL/entities/influencer.statistic-verify-token";
import { InfluencerStatisticVerifyTokenRepository } from "src/DAL/repositories/influencer.statistic-verify-token.repository";
import { MathOperationHelper } from "src/infrastructure/utils/math-operations.helper";
import { InfluencerGroupRepository } from "src/DAL/repositories/influencer-group.repository";
import { InfluencerGroupService } from "./influencer-group.service";
import { SortQuery } from "src/controllers/queries/influencers/sort.query";
import { UniHttpException } from "@unistory/nestjs-common";
import { PlacementLogRepository } from "src/DAL/repositories/placement-log.repository";
import { PlacementLogEntity } from "src/DAL/entities/placement-log.entity";
import { LoggerService } from "@unistory/nestjs-logger";
import { PlacementLogResponseDto } from "src/dto/influencer/placement/placement-log.response.dto";
import { PlacementCreateDto } from "src/dto/influencer/placement/placement.create.dto";
import { PlacementResponseDto } from "src/dto/influencer/placement/placement.response.dto";
import { PlacementUpdateDto } from "src/dto/influencer/placement/placement.update.dto";
import { PlacementEntityAndCsvMapper } from "src/dto/influencer/placement/placementEntityAndCsvMapper.dto";
import {
  TokensBackUpDto,
  TokensDto,
  FacebookToken,
  TiktokBusinessToken,
  TiktokToken,
  YoutubeToken,
} from "src/dto/influencer/placement/tokens-backup.dto";
import { ShortLogResponseDto } from "src/dto/short-log.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";
import { PlacementLastLogRepository } from "src/DAL/repositories/placement-last-log.repository";
import { PlacementLastLogResponseDto } from "src/dto/influencer/placement/placement-last-log.response.dto";
import { PlacementLastLogEntity } from "src/DAL/entities/placement-last-log.entity";
import { StrategyCreateDto } from "src/dto/influencer/strategy.create.dto";
import { StrategyEntity } from "src/DAL/entities/strategy.entity";
import { StrategyRepository } from "src/DAL/repositories/strategy.repository";
import { StrategyDto } from "src/dto/influencer/strategy.dto";

@Injectable()
export class InfluencerService {
  private readonly placementCsvAndEntityFieldsMapper = {
    "Videos/Posts (30 Days)": "totalImpressionsByCurrentMonth",
    "AU/NZ": "AUorNZAuditory",
    '"West (US': "westAuditory",
    "% Sum": "sum",
    "Price (USD)": "priceInUSD",
    "Price (AUD)": "priceInAUD",
    "Talent Fee": "talantFee",
    Superannuation: "super",
    "Agency Fee": "agencyFee",

    "ASF (5%)": "ASF",
  };

  private readonly placementTypeMapper = {
    YOUTUBE: 0,
    TIKTOK: 1,
    INSTAGRAM: 2,
    PODCAST: 3,
    UGC: 4,
  };

  constructor(
    config: ProjectConfigService,

    private readonly _repository: InfluencerRepository,
    private readonly _strategyRepository: StrategyRepository,
    private readonly _groupRepository: InfluencerGroupRepository,
    private readonly _placementRepository: PlacementRepository,
    private readonly _placementLogRepository: PlacementLogRepository,
    private readonly _placementLastLogRepository: PlacementLastLogRepository,

    private readonly _managerService: ManagerService,
    private readonly _configService: ProjectConfigService,
    private readonly _tokenPlacementRepository: PlacementTokenRepository,
    private readonly _groupService: InfluencerGroupService,
    private readonly _statisticTokenRepository: InfluencerStatisticVerifyTokenRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,

    private readonly _logger: LoggerService,
  ) {}

  public async getAllArchived(): Promise<InfluencerDto[]> {
    const influencers = await this._repository.getAllArchivedWithInsights();
    return await this.getMappedAll(influencers);
  }

  public async getAllActive(sort?: SortQuery): Promise<InfluencerDto[]> {
    const influencers = await this._repository.getAllActive(sort);
    return await this.getMappedAll(influencers);
  }

  public async getMappedAll(influencers: InfluencerEntity[]): Promise<InfluencerDto[]> {
    const influencersSortedBySubsCount = influencers.sort(
      (a, b) =>
        (b.youtubeInsight?.impressions || 0) +
        (b.instagramInsight?.impressions || 0) -
        (a.youtubeInsight?.impressions || 0) +
        (a.instagramInsight?.impressions || 0),
    );

    const influencersDto = this._mapper.mapArray(influencersSortedBySubsCount, InfluencerEntity, InfluencerDto);
    for (let dto of influencersDto) {
      dto.isYoutubeConnected = await this._tokenPlacementRepository.isTokenExist(dto.id, PlacementType.YOUTUBE);
      dto.isInstagramConnected = await this._repository.checkFacebookTokenExist(dto.id);
      dto.isTikTokConnected = await this._repository.checkTikTokTokenExist(dto.id);
    }
    return influencersDto;
  }

  public async getAllPlacements(): Promise<PlacementResponseDto[]> {
    const placementsSorted = await this._placementRepository.getAllSortedWithInfluencer();

    const placementsSortedDto = this._mapper.mapArray(placementsSorted, PlacementEntity, PlacementResponseDto);
    for (let [index, dto] of placementsSortedDto.entries()) {
      dto.influencer.isYoutubeConnected = await this._tokenPlacementRepository.isTokenExist(
        dto.influencer.id,
        PlacementType.YOUTUBE,
      );
      dto.influencer.isInstagramConnected = await this._repository.checkFacebookTokenExist(dto.influencer.id);
      dto.influencer.isTikTokConnected = await this._repository.checkTikTokTokenExist(dto.influencer.id);

      if (
        placementsSorted[index]?.influencer?.placementsLog != null &&
        placementsSorted[index]?.influencer?.placementsLog.length > 0
      ) {
        dto.lastLog = new ShortLogResponseDto();

        dto.lastLog.createdAt = placementsSorted[index].influencer.placementsLog[0].createdAt;

        dto.lastLog.manager = new ShortManagerDto();
        dto.lastLog.manager.email = placementsSorted[index].influencer.placementsLog[0]?.manager?.email;
      }
    }
    return placementsSortedDto;
  }

  public async getAllPlacementsByInfluencerId(influencerId: number): Promise<PlacementResponseDto[]> {
    const placement = await this._placementRepository.getAllByInfluencerId(influencerId);
    return this._mapper.mapArray(placement, PlacementEntity, PlacementResponseDto);
  }

  public async getAllLogPlacements(): Promise<PlacementLogResponseDto[]> {
    const placementsSorted = await this._placementLogRepository.getAllSortedWithInfluencer();

    const placementsSortedDto = this._mapper.mapArray(placementsSorted, PlacementLogEntity, PlacementLogResponseDto);
    for (let dto of placementsSortedDto) {
      dto.influencer.isYoutubeConnected = await this._tokenPlacementRepository.isTokenExist(
        dto.influencer.id,
        PlacementType.YOUTUBE,
      );
      dto.influencer.isInstagramConnected = await this._repository.checkFacebookTokenExist(dto.influencer.id);
      dto.influencer.isTikTokConnected = await this._repository.checkTikTokTokenExist(dto.id);
    }
    return placementsSortedDto;
  }
  public async getAllLastPlacementsLogs(): Promise<PlacementLastLogResponseDto[]> {
    const placementsLastLogs = await this._placementLastLogRepository.getAllWithInfluencerAndManager();
    return this._mapper.mapArray(placementsLastLogs, PlacementLastLogEntity, PlacementLastLogResponseDto);
  }

  public async getLogPlacementsByInfluencerId(
    influencerId: number,
    type: PlacementType,
  ): Promise<PlacementLogResponseDto> {
    const placementLog = await this._placementLogRepository.getOneByInfluencerIdAndType(influencerId, type);

    const placementsSortedDto = this._mapper.map(placementLog, PlacementLogEntity, PlacementLogResponseDto);

    return placementsSortedDto;
  }

  public async getOneOrFail(id: number): Promise<InfluencerEntity> {
    const influencer = await this._repository.getById(id);
    if (influencer == null || influencer.isArchived == true) {
      throw new NotFoundException(`influencer with id ${id} not found!`);
    }
    return influencer;
  }

  public async getOneOrFailForUnauthorizedUser(id: number, verifyCode: string): Promise<InfluencerDto> {
    const statisticToken = await this._statisticTokenRepository.getValidToken(verifyCode, id);

    if (statisticToken == null) {
      throw new NotFoundException("can't find valid statistic token!");
    }
    return await this.getOneOrFail(id);
  }

  public async deleteOne(id: number): Promise<number> {
    const influencer = await this._repository.getById(id);
    if (influencer == null) {
      throw new UniHttpException(`influencer with id ${id} not found`);
    }
    await this._repository.remove(influencer);
    return influencer.id;
  }

  public async generateStatisticVerifyCode(id: number): Promise<string> {
    const influencer = await this.getOneOrFail(id);

    const verifyCode = new InfluencerStatisticVerifyTokenEntity();

    const code = uuid();
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + this._configService.influencerVerifyTokenLifeTime);

    verifyCode.code = code;
    verifyCode.expiredAt = expiredAt;
    verifyCode.influencer = influencer;

    await this._statisticTokenRepository.save(verifyCode);

    return code;
  }

  public async changeArchiving(id: number): Promise<boolean> {
    const influencer = await this._repository.getById(id);

    if (influencer == null) {
      throw new NotFoundException(`influencer with id ${id} not found!`);
    }
    influencer.isArchived = !influencer.isArchived;
    await this._repository.save(influencer);

    return influencer.isArchived;
  }

  public async getOneOrFailMapped(id: number): Promise<InfluencerDto> {
    const influencer = await this._repository.getByIdWithGroup(id);

    if (influencer == null) {
      throw new NotFoundException(`influencer with id ${id} not found!`);
    }
    const influencerDto = this._mapper.map(influencer, InfluencerEntity, InfluencerDto);

    influencerDto.isYoutubeConnected = await this._tokenPlacementRepository.isTokenExist(id, PlacementType.YOUTUBE);
    influencerDto.isInstagramConnected = await this._repository.checkFacebookTokenExist(id);
    influencerDto.isTikTokConnected = await this._repository.checkTikTokTokenExist(id);
    return influencerDto;
  }
  public async getOneStrategyOrFailMapped(id: number): Promise<StrategyDto> {
    const strategy = await this._strategyRepository.getStrategyByInfluencerId(id);
    console.log(strategy)
    if (strategy.length==0) {
      return null;
    }
    const strategyDto = this._mapper.map(strategy[0], StrategyEntity, StrategyDto);
    return strategyDto;
  }
  public async getAllStrategiesOrFailMapped(id: number): Promise<StrategyDto[]> {
    const strategy = await this._strategyRepository.getStrategyByInfluencerId(id);
    console.log(strategy)
    if (strategy.length==0) {
      return null;
    }
    const strategyDto = this._mapper.mapArray(strategy, StrategyEntity, StrategyDto);
    return strategyDto;
  }
  public async create(dto: InfluencerCreateDto): Promise<InfluencerEntity> {
    const repeatedFields = await this.influencerUniqueValidate({
      tiktokProfile: dto.tiktokProfile,
      instagramProfile: dto.instagramProfile,
      youtubeProfile: dto.youtubeProfile,
    });
    if (repeatedFields.length != 0) {
      throw new BadRequestException([`influencer with same fields already exist: [${repeatedFields}]`]);
    }

    const newInfluencer = new InfluencerEntity();
    await this.setInfluencerData(newInfluencer, dto);

    const placementEntities: PlacementEntity[] = [];

    const tiktokPlacement = new PlacementEntity();
    tiktokPlacement.type = PlacementType.TIKTOK;
    tiktokPlacement.influencer = newInfluencer;
    placementEntities.push(tiktokPlacement);

    const youtubePlacement = new PlacementEntity();
    youtubePlacement.type = PlacementType.YOUTUBE;
    youtubePlacement.influencer = newInfluencer;
    placementEntities.push(youtubePlacement);

    const podcastPlacement = new PlacementEntity();
    podcastPlacement.type = PlacementType.PODCAST;
    podcastPlacement.influencer = newInfluencer;
    placementEntities.push(podcastPlacement);

    const ugcPlacement = new PlacementEntity();
    ugcPlacement.type = PlacementType.UGC;
    ugcPlacement.influencer = newInfluencer;
    placementEntities.push(ugcPlacement);

    const instagramPlacement = new PlacementEntity();
    instagramPlacement.type = PlacementType.INSTAGRAMM;
    instagramPlacement.influencer = newInfluencer;
    placementEntities.push(instagramPlacement);

    const result = await this._repository.save(newInfluencer);
    await this._placementRepository.saveRange(placementEntities);

    return result;
  }
  public async update(id: number, dto: InfluencerCreateDto): Promise<InfluencerEntity> {
    const repeatedFields = await this.influencerUniqueValidate(
      {
        tiktokProfile: dto.tiktokProfile,
        instagramProfile: dto.instagramProfile,
        youtubeProfile: dto.youtubeProfile,
      },
      id,
    );
    if (repeatedFields.length != 0) {
      throw new BadRequestException([`influencer with same fields already exist: [${repeatedFields}]`]);
    }

    const influencer = await this._repository.getById(id);

    await this.setInfluencerData(influencer, dto);
    const trashPlacementIds: number[] = [];

    if (dto.tiktokProfile == null) {
      const trashTiktokPlacement = await this._placementRepository.getByInfluencerIdAndType(
        influencer.id,
        PlacementType.TIKTOK,
      );

      if (trashTiktokPlacement != null) {
        trashPlacementIds.push(trashTiktokPlacement.id);
      }
    }

    if (dto.youtubeProfile == null) {
      const trashYoutubePlacement = await this._placementRepository.getByInfluencerIdAndType(
        influencer.id,
        PlacementType.YOUTUBE,
      );
      if (trashYoutubePlacement != null) {
        trashPlacementIds.push(trashYoutubePlacement.id);
      }
    }

    if (dto.instagramProfile == null) {
      const trashInstagramPlacement = await this._placementRepository.getByInfluencerIdAndType(
        influencer.id,
        PlacementType.YOUTUBE,
      );
      if (trashInstagramPlacement != null) {
        trashPlacementIds.push(trashInstagramPlacement.id);
      }
    }
    await this._placementRepository.removeAllByIds(trashPlacementIds);
    return await this._repository.save(influencer);
  }
  public async updateStrategy(id: number, dto: StrategyCreateDto): Promise<StrategyEntity> {
    

    const strategy = await this._strategyRepository.getById(id);
    if(strategy){
      await this.setStrategyData(strategy, dto);
      return await this._strategyRepository.save(strategy);
    }
    else{
      return null;
    }

    
  }
  public async insertStrategy(dto: StrategyCreateDto): Promise<StrategyEntity> {

    const strategy = new StrategyEntity();
    this.setStrategyData(strategy, dto);
    return await this._strategyRepository.save(strategy);
  
    

    
  }
  public async setAvatar(influencerId: number, avatar: Express.Multer.File): Promise<void> {
    const influencer = await this._repository.getById(influencerId);
    if (influencer == null) {
      const newFilePath = `./public/${this._configService.avatarFilesPath}/${avatar.filename}`;

      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath);
      }
      throw new NotFoundException(`influencer with id ${influencerId} have not profile`);
    }

    if (influencer.avatar != null && influencer.avatar !== "") {
      const oldImagePath = `./public/${this._configService.avatarFilesPath}/${influencer.avatar}`;

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    influencer.avatar = avatar.filename;
    await this._repository.save(influencer);
  }

  public async generatePlacementFromCsV(placementsCsv: Express.Multer.File): Promise<void> {
    const options = {
      objectMode: true,
      delimiter: ";",
      quote: null,
      headers: true,
      renameHeaders: false,
    };
    try {
      const data: string[] = [];
      fs.createReadStream(placementsCsv.path)
        .pipe(fastCsv.parse(options))
        .on("error", (error) => {
          console.log(error);
        })
        .on("data", (row) => {
          data.push(row);
        })
        .on("end", async (rowCount) => {
          try {
            const mainKey = Object.keys(data[0])[0];

            const columns = data[0][mainKey].split(",");
            const csvMapper = this.generateCsvPlacementMapper(columns);

            const placements: PlacementEntity[] = [];

            for (const row of data.slice(1, -1)) {
              if (row[mainKey].split(",")[0] == "Test") {
                continue;
              }
              const placementData = this.splitCsvRow(row[mainKey]);
              const [firstName, lastName] = placementData[csvMapper.fullnameIndex].split(" ");

              const placementType: string = placementData[csvMapper.placementTypeIndex];
              const placementTypeKey: number = this.placementTypeMapper[placementType.toUpperCase()];

              if (placementTypeKey == null) {
                continue;
              }

              let influencer = await this._repository.getOneByFullName(firstName, lastName);

              if (influencer == null) {
                continue;
              }

              const placement = await this._placementRepository.getByInfluencerIdAndType(
                influencer.id,
                placementTypeKey,
              );

              for (const [index, key] of placementData.entries()) {
                const entityFieldName = csvMapper.mapper[index];

                if (entityFieldName != null) {
                  placement[entityFieldName] = parseInt(key);
                }
              }

              placements.push(placement);
            }
            await this._placementRepository.saveRange(placements);
            if (fs.existsSync(placementsCsv.path)) {
              fs.unlinkSync(placementsCsv.path);
            }
          } catch (e) {
            this._logger.error("Can't parse placements file", e.message);
            throw new UniHttpException("Incorrect placements file format", 501);
          }
        });
    } catch (e) {
      this._logger.warn("Can't parse placements file", e.message);
      throw new UniHttpException("Incorrect placements file format", 555);
    }
  }

  public async createPlacement(influencerId: number, dto: PlacementCreateDto): Promise<void> {
    const influencer = await this.getOneOrFail(influencerId);

    const newPlacement = new PlacementEntity();

    newPlacement.talantFee = dto.talantFee;
    newPlacement.type = dto.type;
    newPlacement.influencer = influencer;

    await this._placementRepository.save(newPlacement);
  }

  public async updatePlacement(id: number, managerId: number, dto: PlacementUpdateDto): Promise<void> {
    const influencer = await this.getOneOrFail(id);
    const placement = await this._placementRepository.getByInfluencerIdAndType(id, dto.type);

    let logPlacement = await this._placementLogRepository.getLastByInfluencerIdAndType(id, dto.type);

    if (logPlacement == null) {
      logPlacement = new PlacementLogEntity();
    }
    logPlacement.createdAt = new Date();
    const manager = await this._managerService.getOneOrFail(managerId);

    let isChanged = false;
    let isASFChanged = false;

    logPlacement.talantFee = placement.talantFee;
    if (dto.talantFee != null) {
      placement.talantFee = dto.talantFee;

      isChanged = true;
      isASFChanged = true;
    }
    logPlacement.agencyFee = placement.agencyFee;
    if (dto.agencyFee != null) {
      placement.agencyFee = dto.agencyFee;

      isChanged = true;
      isASFChanged = true;
    }

    logPlacement.totalImpressionsByCurrentMonth = placement.totalImpressionsByCurrentMonth;
    if (dto.totalImpressionsByCurrentMonth != null) {
      placement.totalImpressionsByCurrentMonth = dto.totalImpressionsByCurrentMonth;
      isChanged = true;
    }
    logPlacement.AUorNZAuditory = placement.AUorNZAuditory;
    if (dto.AUorNZAuditory != null) {
      placement.AUorNZAuditory = dto.AUorNZAuditory;
      isChanged = true;
    }
    logPlacement.westAuditory = placement.westAuditory;
    if (dto.westAuditory != null) {
      placement.westAuditory = dto.westAuditory;
      isChanged = true;
    }
    logPlacement.sum = placement.sum;
    if (dto.sum != null) {
      placement.sum = dto.sum;
      isChanged = true;
    }
    logPlacement.priceInUSD = placement.priceInUSD;
    if (dto.priceInUSD != null) {
      placement.priceInUSD = dto.priceInUSD;
      isChanged = true;
    }
    logPlacement.priceInAUD = placement.priceInAUD;
    if (dto.priceInAUD != null) {
      placement.priceInAUD = dto.priceInAUD;
      isChanged = true;
    }
    logPlacement.boosting = placement.boosting;
    if (dto.boosting != null) {
      placement.boosting = dto.boosting;
      isChanged = true;
    }
    logPlacement.isItems = placement.isItems;
    if (dto.isItems != null) {
      placement.isItems = dto.isItems;
      isChanged = true;
    }

    logPlacement.ASF = placement.ASF;
    if (isASFChanged) {
      placement.ASF = this.calculateASF(placement.talantFee, placement.agencyFee);
    }

    if (!isChanged) {
      throw new UniHttpException("select one of the fields to update");
    }
    logPlacement.manager = manager;
    logPlacement.influencer = influencer;
    logPlacement.type = placement.type;
    await this._placementLogRepository.save(logPlacement);
    await this._placementRepository.save(placement);

    await this.updateLastLogPlacement(influencer.id, managerId, dto.type);
  }

  public async updateLastLogPlacement(id: number, managerId: number, type: PlacementType): Promise<void> {

    const influencer = await this.getOneOrFail(id);

    const placement = await this._placementRepository.getByInfluencerIdAndType(id, type);
    const placementLog = await this._placementLogRepository.getLastByInfluencerIdAndType(id, type);


    const deleteLastLogPlacementsIDs: number[] = [];
    const saveLastLogPlacements: PlacementLastLogEntity[] = [];

    const lastLogPlacement = new PlacementLastLogEntity();

    lastLogPlacement.type = placement.type;
    lastLogPlacement.influencer = influencer;
    lastLogPlacement.createdAt = new Date();
    const manager = await this._managerService.getOneOrFail(managerId);

    let isChanged = false;

    if (placement.talantFee != placementLog.talantFee) {
      isChanged = true;
      const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
        id,
        type,
        "talantFee",
        placementLog.talantFee,
      );
      
      if (lastUpdatedLastLogByField != null) {
        const logId = lastUpdatedLastLogByField.id;
        lastUpdatedLastLogByField.talantFee = null;
        const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
        if (isEmpty) {
          deleteLastLogPlacementsIDs.push(logId);
        } else {
          saveLastLogPlacements.push(lastUpdatedLastLogByField);
        }
      }
      lastLogPlacement.talantFee = placementLog.talantFee;
    }
    // if (placement.agencyFee != placementLog.agencyFee) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "agencyFee",
    //     placementLog.agencyFee,
    //   );
      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.agencyFee = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);

    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.agencyFee = placement.agencyFee;
    // }
    // if (placement.totalImpressionsByCurrentMonth != placementLog.totalImpressionsByCurrentMonth) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "totalImpressionsByCurrentMonth",
    //     placementLog.totalImpressionsByCurrentMonth,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.totalImpressionsByCurrentMonth = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.totalImpressionsByCurrentMonth = placement.totalImpressionsByCurrentMonth;
    // }

    // if (placement.AUorNZAuditory != placementLog.AUorNZAuditory) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "AUorNZAuditory",
    //     placementLog.AUorNZAuditory,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.AUorNZAuditory = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.AUorNZAuditory = placement.AUorNZAuditory;
    // }

    // if (placement.westAuditory != placementLog.westAuditory) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "westAuditory",
    //     placementLog.westAuditory,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.westAuditory = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.westAuditory = placement.westAuditory;
    // }
    // if (placement.sum != placementLog.sum) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "sum",
    //     placementLog.sum,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.sum = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.sum = placement.sum;
    // }

    // if (placement.priceInUSD != placementLog.priceInUSD) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "priceInUSD",
    //     placementLog.priceInUSD,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.priceInUSD = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.priceInUSD = placement.priceInUSD;
    // }

    // if (placement.priceInAUD != placementLog.priceInAUD) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "priceInAUD",
    //     placementLog.priceInAUD,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.priceInAUD = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.priceInAUD = placement.priceInAUD;
    // }

    if (placement.boosting != placementLog.boosting) {
      isChanged = true;
      const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
        id,
        type,
        "boosting",
        placementLog.boosting,
      );

      
      if (lastUpdatedLastLogByField != null) {
        const logId = lastUpdatedLastLogByField.id;
        lastUpdatedLastLogByField.boosting = null;
        const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
        if (isEmpty) {
          deleteLastLogPlacementsIDs.push(logId);
        } else {
          saveLastLogPlacements.push(lastUpdatedLastLogByField);
        }
      }
      lastLogPlacement.boosting = placementLog.boosting;
    }
    // if (placement.isItems != placementLog.isItems) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "isItems",
    //     placementLog.isItems,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.isItems = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.isItems = placement.isItems;
    // }

    // if (placement.ASF != placementLog.ASF) {
    //   isChanged = true;
    //   const lastUpdatedLastLogByField = await this._placementLastLogRepository.getOneByInfluencerIdAndTypeAndField(
    //     id,
    //     type,
    //     "ASF",
    //     placementLog.ASF,
    //   );

      
    //   if (lastUpdatedLastLogByField != null) {
    //     const logId = lastUpdatedLastLogByField.id;
    //     lastUpdatedLastLogByField.ASF = null;
    //     const isEmpty = this.checkLastLogPlacementIsEmpty(lastUpdatedLastLogByField);
    //     if (isEmpty) {
    //       deleteLastLogPlacementsIDs.push(logId);
    //     } else {
    //       saveLastLogPlacements.push(lastUpdatedLastLogByField);
    //     }
    //   }
    //   lastLogPlacement.ASF = placement.ASF;
    // }



    lastLogPlacement.manager = manager;

    if (isChanged) {
      await this._placementLastLogRepository.saveRange(saveLastLogPlacements);
      await this._placementLastLogRepository.removeAllByIds(deleteLastLogPlacementsIDs);
      await this._placementLastLogRepository.save(lastLogPlacement);
      
    }
  }

  private checkLastLogPlacementIsEmpty(lastLog: PlacementLastLogEntity): boolean {
    if (lastLog.talantFee != null) {
      return false;
    }
    if (lastLog.totalImpressionsByCurrentMonth != null) {
      return false;
    }
    if (lastLog.AUorNZAuditory != null) {
      return false;
    }
    if (lastLog.westAuditory != null) {
      return false;
    }
    if (lastLog.sum != null) {
      return false;
    }

    if (lastLog.priceInUSD != null) {
      return false;
    }
    if (lastLog.priceInAUD != null) {
      return false;
    }
    if (lastLog.boosting != null) {
      return false;
    }
    if (lastLog.isItems != null) {
      return false;
    }
    if (lastLog.ASF != null) {
      return false;
    }
    return true;
  }

  public async createEmptyPlacementForAllInfluencer(): Promise<void> {
    const influencers = await this._repository.getAll();

    const placementEntities: PlacementEntity[] = [];

    influencers.forEach((newInfluencer) => {
      const tiktokPlacement = new PlacementEntity();
      tiktokPlacement.type = PlacementType.TIKTOK;
      tiktokPlacement.influencer = newInfluencer;
      placementEntities.push(tiktokPlacement);

      const youtubePlacement = new PlacementEntity();
      youtubePlacement.type = PlacementType.YOUTUBE;
      youtubePlacement.influencer = newInfluencer;
      placementEntities.push(youtubePlacement);

      const instagramPlacement = new PlacementEntity();
      instagramPlacement.type = PlacementType.INSTAGRAMM;
      instagramPlacement.influencer = newInfluencer;

      placementEntities.push(instagramPlacement);
    });
    await this._placementRepository.saveRange(placementEntities);
  }

  public async getCsv(ids: number[]): Promise<string> {
    const influencers = await this._repository.getAllByIds(ids);
    const influencersDto = this._mapper.mapArray(influencers, InfluencerEntity, InfluencerDto);
    return parse(influencersDto);
  }
  public async getBackupTokens(): Promise<TokensBackUpDto[]> {
    const influencers = await this._repository.getAllWithTokens();
    const result: TokensBackUpDto[] = [];

    for (const influencer of influencers) {
      console.log(influencer);

      const backUp = new TokensBackUpDto();

      backUp.fullName = `${influencer.firstname} ${influencer.lastname}`;
      backUp.tokens = new TokensDto();
      if (influencer.facebookToken != null) {
        backUp.tokens.facebook = new FacebookToken();
        backUp.tokens.facebook.accessToken = influencer.facebookToken.value;
      }
      if (influencer.tikTokToken != null && influencer.tikTokToken.length > 0) {
        backUp.tokens.tiktok = new TiktokToken();
        backUp.tokens.tiktok.accessToken = influencer.tikTokToken[0].accessToken;
        backUp.tokens.tiktok.refreshToken = influencer.tikTokToken[0].refreshToken;
      }
      if (influencer.tikTokBusinessToken != null && influencer.tikTokBusinessToken.length > 0) {
        backUp.tokens.tiktokBusiness = new TiktokBusinessToken();
        backUp.tokens.tiktokBusiness.accessToken = influencer.tikTokBusinessToken[0].accessToken;
        backUp.tokens.tiktokBusiness.refreshToken = influencer.tikTokBusinessToken[0].refreshToken;
        backUp.tokens.tiktokBusiness.openId = influencer.tikTokBusinessToken[0].openId;
      }

      if (influencer.placementToken != null && influencer.placementToken.length > 0) {
        const youtubeTokens = influencer.placementToken.filter((el) => el.type == PlacementType.YOUTUBE);

        if (youtubeTokens != null && youtubeTokens.length > 0) {
          backUp.tokens.youtube = new YoutubeToken();
          backUp.tokens.youtube.accessToken = youtubeTokens[0].accessToken;
          backUp.tokens.youtube.refreshToken = youtubeTokens[0].refreshToken;
        }
      }
      result.push(backUp);
    }
    return result;
  }

  private async influencerUniqueValidate(dto: InfluencerUniqueFieldsDto, id?: number): Promise<string[]> {
    const keys = Object.keys(dto);
    const repeatedFields = [];

    for (const key of keys) {
      if (await this._repository.checkRecordWithValueExistence(key, dto[key], id)) {
        repeatedFields.push(key);
      }
    }
    return repeatedFields;
  }

  private async setInfluencerData(influencer: InfluencerEntity, dto: InfluencerCreateDto) {
    influencer.firstname = dto.firstname ?? null;
    influencer.lastname = dto.lastname ?? null;
    influencer.email = dto.email ?? null;
    influencer.mediaKitLink = dto.mediaKitLink ?? null;
    influencer.phone = dto.phone ?? null;
    influencer.tiktokProfile = dto.tiktokProfile ?? null;
    influencer.instagramProfile = dto.instagramProfile ?? null;
    influencer.youtubeProfile = dto.youtubeProfile ?? null;
    influencer.streetAddress = dto.streetAddress ?? null;
    influencer.bank = dto.bank ?? null;
    influencer.bankAccountName = dto.bankAccountName ?? null;
    influencer.bankBSB = dto.bankBSB ?? null;
    influencer.bankAccountNumber = dto.bankAccountNumber ?? null;
    influencer.age = dto.age ?? null;
    influencer.havePartner = dto.havePartner ?? null;
    influencer.alcohol = dto.alcohol ?? null;
    influencer.dreamBrandCollaboration = dto.dreamBrandCollaboration ?? null;
    influencer.leftOrRightHand = dto.leftOrRightHand ?? null;
    influencer.shoeSize = dto.shoeSize ?? null;
    influencer.dreamHolidayDestination = dto.dreamHolidayDestination ?? null;
    influencer.dreamCar = dto.dreamCar ?? null;
    influencer.milkOfChoice = dto.milkOfChoice ?? null;
    influencer.yourPhone = dto.yourPhone ?? null;
    influencer.yourPhoneProvider = dto.yourPhoneProvider ?? null;
    influencer.investmentService = dto.investmentService ?? null;
    influencer.supermarket = dto.supermarket ?? null;
    influencer.chemistOfChoice = dto.chemistOfChoice ?? null;
    influencer.bottleshopOfChoice = dto.bottleshopOfChoice ?? null;
    influencer.internetProvider = dto.internetProvider ?? null;
    influencer.charityOfChoice = dto.charityOfChoice ?? null;
    influencer.streaming = dto.streaming ?? null;
    influencer.musicStreamingOfChoice = dto.musicStreamingOfChoice ?? null;
    influencer.TFN = dto.TFN ?? null;
    influencer.superFundName = dto.superFundName ?? null;
    influencer.superFundBillerCode = dto.superFundBillerCode ?? null;
    influencer.superFundReferenceNumber = dto.superFundReferenceNumber ?? null;
    influencer.birthday = dto.birthday ?? null;
    influencer.giftIdeas = dto.giftIdeas ?? null;
    influencer.isHelp = dto.isHelp ?? null;
    influencer.notes = dto.notes ?? null;
    influencer.contractEndDate = dto.contractEndDate ?? null;
    influencer.contractStartDate = dto.contractStartDate ?? null;
    influencer.state = dto.state ?? null;
    influencer.ABN = dto.ABN ?? null;

    if (dto.groupName != null) {
      const group = await this._groupService.findOneOrCreate(dto.groupName);
      influencer.group = group;
    } else {
      influencer.group = null;
    }
  }
  private async setStrategyData(strategy: StrategyEntity, dto: StrategyCreateDto) {
    strategy.influencer = dto.influencer ?? null;
    strategy.manager = dto.manager ?? null;
    strategy.tasks = dto.tasks ?? null;
    strategy.PR = dto.PR ?? null;
    strategy.life = dto.life ?? null;
    strategy.high_level = dto.high_level ?? null;
    strategy.brand_strategy = dto.brand_strategy ?? null;
    strategy.content_tiktok = dto.content_tiktok ?? null;
    strategy.content_ig = dto.content_ig ?? null;
    strategy.content_yt = dto.content_yt ?? null;
    strategy.content_collabs = dto.content_collabs ?? null;
    strategy.tour = dto.tour ?? null;
    strategy.hosting = dto.hosting ?? null;
    strategy.podcast = dto.podcast ?? null;
    strategy.film = dto.film ?? null;
    strategy.projects = dto.projects ?? null;
    
  }
  private generateCsvPlacementMapper(csvTableKeys: string[]): PlacementEntityAndCsvMapper {
    const csvMapper = new PlacementEntityAndCsvMapper();
    csvMapper.mapper = {};

    for (const [index, key] of csvTableKeys.entries()) {
      if (key == "Talent") {
        csvMapper.fullnameIndex = index;
        continue;
      }
      if (key == "Placement") {
        csvMapper.placementTypeIndex = index;
        continue;
      }

      const entityKey = this.placementCsvAndEntityFieldsMapper[key];

      if (entityKey != null) {
        csvMapper.mapper[index] = entityKey;
      }
    }
    return csvMapper;
  }

  private splitCsvRow(row: string): string[] {
    row = row.replace(/"/g, "");
    let initIndex = 0;

    const result = [];
    for (const [index, symbol] of row.split("").entries()) {
      if (symbol == ",") {
        const prevSymbolIsNumber = MathOperationHelper.isNumber(row[index - 1]);
        const nextSymbolIsNumber = MathOperationHelper.isNumber(row[index + 1]);

        if (prevSymbolIsNumber == false || nextSymbolIsNumber == false) {
          let res = row.slice(initIndex, index);
          initIndex = index + 1;

          if (res.toLowerCase().match(/[a-z]/g)) {
            result.push(res);
          } else {
            result.push(MathOperationHelper.parseNumber(res));
          }
        }
      }
    }
    const lastElement = row.slice(initIndex);
    result.push(MathOperationHelper.parseNumber(lastElement));
    return result;
  }
  private calculateASF(talantFee: number, agencyFee: number): number {
    if (talantFee == null || agencyFee == null) {
      return 0;
    }

    const result = (talantFee + agencyFee) * 0.005;

    return +result.toFixed(2);
  }
}
