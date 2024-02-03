import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { TokenEntity } from "src/DAL/entities/token.entity";

@Injectable()
export class TokenRepository {
  private readonly repository: Repository<TokenEntity>;

  constructor(
    @InjectDataSource()
    dataSource: DataSource,
    private readonly configService: ProjectConfigService,
  ) {
    this.repository = dataSource.getRepository(TokenEntity);
  }

  public createNew(jti: string, managerId: number): TokenEntity {
    const entity = new TokenEntity();
    entity.jti = jti;
    entity.expiresAt = new Date(Date.now() + this.configService.accessTokenExpirationTime * 1000);
    entity.managerId = managerId;

    return entity;
  }

  public async findByJti(jti: string): Promise<TokenEntity> {
    return this.repository.findOne({
      where: {
        jti: jti,
      },
    });
  }
}
