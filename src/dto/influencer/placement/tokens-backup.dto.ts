import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

export class TokensBackUpDto {

  fullName: string;

  tokens: TokensDto;
}


export class YoutubeToken {
  accessToken: string;
  refreshToken: string;
}

export class TiktokToken {
  accessToken: string;
  refreshToken: string;
}

export class FacebookToken {
  accessToken: string;
  refreshToken: string;
  securityStamp: string;
  igId: string;
}

export class TiktokBusinessToken {
  accessToken: string;
  refreshToken: string;
  openId: string;
}

export class TokensDto {
  youtube: YoutubeToken;
  tiktok: TiktokToken;
  tiktokBusiness: TiktokBusinessToken;
  facebook: FacebookToken;
}

