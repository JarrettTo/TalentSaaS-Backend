import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeDeviceResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  MOBILE?: number;

  @ApiPropertyOptional()
  @AutoMap()
  DESKTOP?: number;

  @ApiPropertyOptional()
  @AutoMap()
  TV?: number;
}
