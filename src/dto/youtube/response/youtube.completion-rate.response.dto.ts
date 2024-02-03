import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeCompletionRateResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  averageViewDuration: number;

  @ApiPropertyOptional()
  @AutoMap()
  averageViewPercentage: number;
}
