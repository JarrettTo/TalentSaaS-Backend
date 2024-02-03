import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeBaseAgeResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  "age18-24"?: number;

  @ApiPropertyOptional()
  @AutoMap()
  "age25-34"?: number;

  @ApiPropertyOptional()
  @AutoMap()
  "age35-44"?: number;

  @ApiPropertyOptional()
  @AutoMap()
  "age45-54"?: number;

  @ApiPropertyOptional()
  @AutoMap()
  "age55-64"?: number;

  @ApiPropertyOptional()
  @AutoMap()
  "age65-"?: number;
}
