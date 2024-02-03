import { FindOptionsWhere, Repository } from "typeorm";

export abstract class BaseEntity {
  public id: number;
}

export abstract class BaseRepository<TEntity extends BaseEntity> {
  protected readonly _repository: Repository<TEntity>;

  protected constructor(repository: Repository<TEntity>) {
    this._repository = repository;
  }

  public async getAll(): Promise<TEntity[]> {
    return await this._repository.createQueryBuilder().getMany();
  }

  public async getById(id: number): Promise<TEntity> {
    return this._repository.findOne({ where: { id } as FindOptionsWhere<TEntity> });
  }

  public async save(entity: TEntity): Promise<TEntity> {
    return await this._repository.save(entity);
  }

  public async saveRange(entities: TEntity[]): Promise<TEntity[]> {
    return await this._repository.save(entities);
  }

  public async remove(entity: TEntity): Promise<void> {
    await this._repository.remove(entity);
  }
  public async removeRange(entity: TEntity[]): Promise<void> {
    await this._repository.remove(entity);
  }
  public async removeAll(): Promise<void> {
    await this._repository.createQueryBuilder().delete().execute();
  }
  public async removeAllByIds(ids: number[]): Promise<void> {
    await this._repository.createQueryBuilder().delete().where("id = ANY(:ids)", { ids }).execute();
  }
}
