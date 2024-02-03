import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PaginationQuery } from "src/controllers/queries/pagination.query";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";
import { QuoteListEntity } from "../entities/quote-list.entity";

export class QuoteListRepository extends BaseRepository<QuoteListEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(QuoteListEntity));
  }

  public async findAll(
    pagination: PaginationQuery,
    isArchived: boolean = false,
  ): Promise<ICountedItems<QuoteListEntity>> {
    const query = this._repository.createQueryBuilder("list");

    if (pagination != null) {
      query.limit(pagination.limit);
      query.offset(pagination.offset);
    }

    query.leftJoinAndSelect("list.quotes", "quote");
    query.leftJoinAndSelect("quote.influencer", "influencer");
    query.where(`list.isArchived = ${isArchived}`);

    query.orderBy("list.id", "DESC");
    query.orderBy("influencer.id", "DESC");
    query.orderBy("quote.id", "DESC");

    const [items, totalCount] = await query.getManyAndCount();
    return {
      items,
      totalCount,
    };
  }

  public async findByIdWithQuotes(id: number): Promise<QuoteListEntity> {
    return this._repository.findOne({
      where: { id },
      relations: {
        quotes: {
          influencer: true,
        },
      },
    });
  }

  public async getOneByVerifyCode(verifyCode: string): Promise<QuoteListEntity> {
    return await this._repository.findOne({
      where: {
        verifyCode: verifyCode,
      },
      relations: {
        quotes: {
          influencer: true
        },
        
      },
    });
  }
}
