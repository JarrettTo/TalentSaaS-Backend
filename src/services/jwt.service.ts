import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuid } from "uuid";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { TokenEntity } from "src/DAL/entities/token.entity";
import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { JwtPayload } from "src/dto/auth/jwt-payload";
import { JwtPairDto } from "src/dto/auth/jwt-pair.dto";
import { TokenRepository } from "src/DAL/repositories/token.repository";

@Injectable()
export class ApiJWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ProjectConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async generateTokensPair(manager: ManagerEntity): Promise<JwtPairDto> {
    const payload = this.createPayloadByManager(manager);
    const tokensId = uuid();
    const tokens = this.signNewTokens(tokensId, payload);

    await this.tokenRepository.createNew(tokensId, manager.id).save();

    return tokens;
  }

  private createPayloadByManager(manager: ManagerEntity): JwtPayload {
    return {
      id: manager.id,
      email: manager.email,
    };
  }

  public signNewTokens(tokensId: string, payload: any): JwtPairDto {
    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.accessTokenSecret,
        expiresIn: this.configService.accessTokenExpirationTime,
        jwtid: tokensId,
      },
    );
    const refreshToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.accessTokenSecret,
        expiresIn: this.configService.accessTokenExpirationTime,
        jwtid: tokensId,
      },
    );

    const tokens = new JwtPairDto();
    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken;

    return tokens;
  }

  public async getToken(refreshToken: string): Promise<TokenEntity> {
    const jwtPayload = this.jwtService.decode(refreshToken) as JwtPayload;
    if (jwtPayload == null) {
      return null;
    }
    return this.tokenRepository.findByJti(jwtPayload.jti);
  }
}
