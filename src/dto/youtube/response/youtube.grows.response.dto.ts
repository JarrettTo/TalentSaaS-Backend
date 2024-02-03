import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeGrowsAndLossesResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  subscribersGained?: number;

  @ApiPropertyOptional()
  @AutoMap()
  subscribersLost?: number;
}
