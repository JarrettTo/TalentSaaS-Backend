import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeBaseCountriesResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  AU?: number;

  @ApiPropertyOptional()
  @AutoMap()
  CA?: number;

  @ApiPropertyOptional()
  @AutoMap()
  GB?: number;

  @ApiPropertyOptional()
  @AutoMap()
  NL?: number;

  @ApiPropertyOptional()
  @AutoMap()
  NZ?: number;

  @ApiPropertyOptional()
  @AutoMap()
  SE?: number;

  @ApiPropertyOptional()
  @AutoMap()
  US?: number;

  @ApiPropertyOptional()
  @AutoMap()
  VN?: number;
}
