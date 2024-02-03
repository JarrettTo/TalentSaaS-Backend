import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class TiktokAuthResponseDto {
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "open_id" })
  openId: string;

  @ApiProperty()
  @AutoMap()
  scope: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "expires_in" })
  expiresIn: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "access_token" })
  accessToken: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "refresh_token" })
  refreshToken: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "refresh_expires_in" })
  refreshExpiresIn: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "token_type" })
  tokenType: string;
}

export class TiktokBusinessAuthResponseDto {
  @ApiProperty()
  @AutoMap()
  code: number;

  @ApiProperty()
  @AutoMap()
  message: string;

  @ApiProperty()
  @AutoMap()
  @ValidateNested({ each: true })
  @Expose()
  @Type(() => TiktokAuthResponseDto)
  data: TiktokAuthResponseDto;
}
