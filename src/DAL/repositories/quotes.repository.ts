import { QuoteEntity } from "./../entities/quote.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { BaseRepository } from "src/DAL/repositories/base.repository";
import { PaginationQuery } from "src/controllers/queries/pagination.query";
import { ICountedItems } from "src/infrastructure/interfaces/counted-items.interface";

export class QuoteRepository extends BaseRepository<QuoteEntity> {
  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    super(_connection.getRepository(QuoteEntity));
  }

  public async findAll(pagination: PaginationQuery, isArchived: boolean=false): Promise<ICountedItems<QuoteEntity>> {
    const query = this._repository.createQueryBuilder("quote");

    if (pagination != null) {
      query.limit(pagination.limit);
      query.offset(pagination.offset);
    }

    query.leftJoinAndSelect("quote.influencer", "influencer");    
    query.where(`quote.isArchived = ${isArchived}`);

    query.orderBy("quote.id", "DESC");

    const [items, totalCount] = await query.getManyAndCount();
    return {
      items,
      totalCount,
    };
  }


  public async getByIdWithQuoteList(id: number): Promise<QuoteEntity> {
    return this._repository.findOne({ where: { id }, relations: { quoteList: true}});
  }

}
