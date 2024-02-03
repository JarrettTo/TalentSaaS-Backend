import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, In, IsNull, Not, SelectQueryBuilder } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { InfluencerEntity } from "src/DAL/entities/influencer.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { FacebookToken } from "../entities/facebook-token.entity";
import { TotalStatisticDto } from "src/dto/statistic/total-statistic.dto";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { InfluencerPlatformsDto } from "src/dto/influencer/platforms.dto";

import { SortQuery } from "src/controllers/queries/influencers/sort.query";
import { OrderQuery } from "src/controllers/queries/influencers/order.query";
import { SelectQuery } from "typeorm/query-builder/SelectQuery";
import { MathOperationHelper } from "src/infrastructure/utils/math-operations.helper";

export class InfluencerRepository extends BaseRepository<InfluencerEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(InfluencerEntity));
  }

  public async getAllArchivedWithInsights(): Promise<InfluencerEntity[]> {
    const query = this._repository
      .createQueryBuilder("influencer")
      .where("influencer.isArchived = TRUE")
      .leftJoinAndSelect("influencer.instagramInsight", "instagramInsight")
      .leftJoinAndSelect("influencer.youtubeInsight", "youtubeInsight");

    return await query.getMany();
  }

  public async getAllActive(sort?: SortQuery): Promise<InfluencerEntity[]> {
    const query = this._repository
      .createQueryBuilder("influencer")
      .where("influencer.isArchived = FALSE")
      .leftJoinAndSelect("influencer.group", "group");

    if (sort?.order != null) {
      if (sort.order.group != null) {
        const orderFields = Object.keys(sort.order.group);
        for (const field of orderFields) {
          query.addOrderBy(`group.${field}`, sort.order.group[field]);
        }
      }
      if (sort?.order.influencer != null) {
        const orderFields = Object.keys(sort.order.influencer);
        for (const field of orderFields) {
          query.addOrderBy(`influencer.${field}`, sort.order.influencer[field]);
        }
      }
    }

    return await query.getMany();
  }

  public async getAllWithInsights(): Promise<InfluencerEntity[]> {
    const query = this._repository
      .createQueryBuilder("influencer")
      .leftJoinAndSelect("influencer.instagramInsight", "instagramInsight")
      .leftJoinAndSelect("influencer.youtubeInsight", "youtubeInsight");

    return await query.getMany();
  }

  public async checkRecordWithValueExistence(field: string, value: string, id?: number): Promise<boolean> {
    const query = this._repository.createQueryBuilder("influencer");
    query.where(`influencer.${field} = :value`, { value });

    if (id != null) {
      query.andWhere(`influencer.id <> :id`, { id });
    }

    const result = await query.getOne();

    return result != null;
  }

  public async checkFacebookTokenExist(id: number): Promise<boolean> {
    const influencer = await this._repository.findOne({
      where: {
        id: id,
      },
      relations: {
        facebookToken: true,
      },
    });
    const facebookToken = influencer?.facebookToken;
    return facebookToken?.value != null && facebookToken?.igId != null;
  }

  public async checkTikTokTokenExist(id: number): Promise<boolean> {
    const influencer = await this._repository.findOne({
      where: {
        id: id,
      },
      relations: {
        tikTokToken: true,
      },
    });
    const tikTokToken = influencer?.tikTokToken;
    return tikTokToken != null && tikTokToken.length != 0;
  }

  public async getByFbTokenIdOrFail(id: number): Promise<InfluencerEntity> {
    const entity = this._repository.findOne({ where: { facebookTokenId: id } });
    if (entity == null) {
      throw new Error("Sequence contains no element when doing finding influencer by facebookTokenId");
    }

    return entity;
  }

  public async getByIdWithGroup(id: number): Promise<InfluencerEntity> {
    return this._repository.findOne({ where: { id }, relations: { group: true } });
  }

  public async getWithFacebookTokenAndInsight(id: number): Promise<InfluencerEntity> {
    const influencer = await this._repository.findOne({
      where: { id: id },
      relations: {
        facebookToken: true,
        instagramInsight: true,
      },
    });
    return influencer;
  }

  public async getAllSortedWithConnectedFacebook(): Promise<InfluencerEntity[]> {
    return await this._repository.find({
      where: {
        facebookTokenId: Not(IsNull()),
      },
      order: {
        id: "ASC",
      },
    });
  }

  public async getAllSortedWithConnectedYoutube(): Promise<InfluencerEntity[]> {
    return await this._repository.find({
      where: {
        placementToken: {
          type: PlacementType.YOUTUBE,
        },
      },
      order: {
        id: "ASC",
      },
    });
  }

  public async getTotalStatistic(): Promise<TotalStatisticDto> {
    const query = await this._repository
      .createQueryBuilder("influencer")
      .where("influencer.isArchived = FALSE")
      .leftJoinAndSelect("influencer.instagramInsight", "instagramInsight")
      .leftJoinAndSelect("influencer.tiktokInsight", "tiktokInsight")
      .leftJoinAndSelect("influencer.youtubeInsight", "youtubeInsight")

      .leftJoinAndSelect("instagramInsight.countries", "instagramCountries")
      .leftJoinAndSelect("instagramInsight.genderAges", "instagramGenderAges")

      .leftJoinAndSelect("tiktokInsight.countries", "tiktokCountries")
      .leftJoinAndSelect("tiktokInsight.genders", "tiktokGenders")
      .leftJoinAndSelect("tiktokInsight.ages", "tiktokAges")

      .leftJoinAndSelect("youtubeInsight.countries", "youtubeCountries")
      .leftJoinAndSelect("youtubeInsight.genders", "youtubeGenders")
      .leftJoinAndSelect("youtubeInsight.ages", "youtubeAges")
    
    const result = await query.getMany();

    const dto = new TotalStatisticDto();


    dto.instagramViews = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.instagramInsight?.impressions), 0);
    dto.tiktokViews = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.tiktokInsight?.impressions), 0);
    dto.youtubeViews = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.youtubeInsight?.impressions), 0);

    dto.totalViews = dto.instagramViews + dto.tiktokViews + dto.youtubeViews;

    dto.instagramFollowers = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.instagramInsight?.followersCount), 0);
    dto.tiktokFollowers = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.tiktokInsight?.followersCount), 0);
    dto.youtubeFollowers = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.youtubeInsight?.followersCount), 0);

    dto.totalFollowers = dto.instagramFollowers + dto.tiktokFollowers + dto.youtubeFollowers;

    dto.instagramEngagement = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.instagramInsight?.engagement), 0);
    dto.tiktokEngagement = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.tiktokInsight?.engagement), 0);
    dto.youtubeEngagement = result.reduce((accumulator, el) => accumulator + MathOperationHelper.toNumber(el?.youtubeInsight?.engagement), 0);

    dto.totalEngagement = dto.instagramEngagement + dto.tiktokEngagement + dto.youtubeEngagement;

    dto.averageAllViewsPerPlatformCount = (dto.instagramViews + dto.tiktokViews + dto.youtubeViews) / 3;
    dto.averageAllEngagementPerPlatformCount = (dto.instagramEngagement + dto.tiktokEngagement + dto.youtubeEngagement) / 3;
    
    return dto;
  }

  public async getAllByIds(ids: number[]): Promise<InfluencerEntity[]> {
    return await this._repository.find({
      where: {
        id: In(ids),
      },
    });
  }

  public async getAllWithTokens(): Promise<InfluencerEntity[]> {
    return await this._repository.find({
      relations: {
        placementToken: true,
        tikTokToken: true,
        facebookToken: true,
      }
    });
  }


  public async getOneByFullName(firstname: string, lastname: string): Promise<InfluencerEntity> {
    return await this._repository.findOne({
      where: {
        firstname: firstname,
        lastname: lastname,
      },
    });
  }
  public async getOneWIthPlacementsByQuoteListId(quoteListId: number): Promise<InfluencerEntity> {
    return await this._repository.findOne({
      where: {
        quotes: {
          quoteList: {
            id: quoteListId
          }
        }
      },
      relations: {
        placements: true
      }
    });
  }

  public async getAllPlatforms(): Promise<InfluencerPlatformsDto> {
    const query = this._repository
      .createQueryBuilder("influencer")

      .select("influencer.tiktokProfile", "tiktok")
      .addSelect("influencer.instagramProfile", "instagram")
      .addSelect("influencer.youtubeProfile", "youtube");

    const rows = await query.getRawMany();
    console.log("rows: ", rows);
    const statistic = new InfluencerPlatformsDto();

    for (const row of rows) {
      if (row["instagram"] != null) statistic.instagram.push(row["instagram"]);
      if (row["tiktok"] != null) statistic.tiktok.push(row["tiktok"]);
      if (row["youtube"] != null) statistic.youtube.push(row["youtube"]);
    }

    return statistic;
  }

  public async generateSteamByIds(ids: number[]): Promise<ReadStream> {
    const manager = this._connection.createEntityManager();
    const queryStream: ReadStream = await manager
      .createQueryBuilder()
      .select(`*`)
      .from("influencer", "influencer")
      .where("influencer.id IN :ids", { ids })
      .stream();

    return queryStream;
  }

  public async getOneByTikTokPlatform(tiktokProfile: string): Promise<InfluencerEntity> {
    return await this._repository.findOne({
      where: {
        tiktokProfile: tiktokProfile
        }
    });
  }
}
