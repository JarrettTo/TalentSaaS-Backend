import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PaginationQuery } from "src/controllers/queries/pagination.query";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";
import { QuoteLogListEntity } from "../entities/quote-log-list.entity";

export class QuoteLogListRepository extends BaseRepository<QuoteLogListEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(QuoteLogListEntity));
  }

  public async findAll(pagination: PaginationQuery): Promise<ICountedItems<QuoteLogListEntity>> {
    const query = this._repository.createQueryBuilder("quote");

    if (pagination != null) {
      query.limit(pagination.limit);
      query.offset(pagination.offset);
    }

    query.leftJoinAndSelect("quote.placement", "placement");
    query.leftJoinAndSelect("placement.influencer", "influencer");

    query.orderBy("quote.id", "DESC");

    const [items, totalCount] = await query.getManyAndCount();
    return {
      items,
      totalCount,
    };
  }

  public async getOneByQuoteListId(quoteListId: number): Promise<QuoteLogListEntity> {
    return await this._repository.findOne({
      relations: {
        quotesLogs: {
          manager: true,
        }
      },
      where: {
        quoteList: {
          id: quoteListId,
        }
      }
    });
  }
  
}
