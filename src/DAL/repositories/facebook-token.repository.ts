import { BaseRepository } from "src/DAL/repositories/base.repository";
import { FacebookToken } from "src/DAL/entities/facebook-token.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export class FacebookTokenRepository extends BaseRepository<FacebookToken> {
  constructor(@InjectDataSource() ctx: DataSource) {
    super(ctx.getRepository(FacebookToken));
  }

  public getBySecurityStamp(stamp: string): Promise<FacebookToken> {
    return this._repository.findOne({ where: { securityStamp: stamp } });
  }
}
