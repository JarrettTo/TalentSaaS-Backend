import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { TIkTokBusinessCountryInsightResponseDto } from "./tiktok-insight.country.response.dto";
import { TIkTokBusinessGenderInsightResponseDto } from "./tiktok-insight.gender.response.dto copy";

export class TiktokBusinessBaseAccountInfoResponseDto {
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "username" })
  username: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "display_name" })
  displayName: string;
}

export class TiktokBusinessAccountInfoResponseDto {
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
  @Type(() => TiktokBusinessBaseAccountInfoResponseDto)
  data: TiktokBusinessBaseAccountInfoResponseDto;
}
