import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PaginationQuery } from "src/controllers/queries/pagination.query";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";
import { QuoteLogEntity } from "../entities/quote-log.entity";

export class QuoteLogRepository extends BaseRepository<QuoteLogEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(QuoteLogEntity));
  }

  public async findAll(pagination: PaginationQuery): Promise<ICountedItems<QuoteLogEntity>> {
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


  public async getOneByQuoteId(quoteId: number): Promise<QuoteLogEntity> {
    return await this._repository.findOne({
      relations: {
        quote: true,
        manager: true,
      },
      where: {
        quote: {
          id: quoteId
        },
      },
    });
  }
}
