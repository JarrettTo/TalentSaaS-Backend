import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeActivityStatisticResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  likes: number;

  @ApiPropertyOptional()
  @AutoMap()
  comments: number;

  @ApiPropertyOptional()
  @AutoMap()
  dislikes: number;
}
