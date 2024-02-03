import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { JwtPayload } from "src/dto/auth/jwt-payload";
import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { TokenRepository } from "src/DAL/repositories/token.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ProjectConfigService, private readonly tokenRepository: TokenRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const token = await this.tokenRepository.findByJti(payload.jti);
    if (token == null) {
      // TODO: change text
      throw new UnauthorizedException("BAD!!!");
    }
    return payload;
  }
}
