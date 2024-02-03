import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class TikTokVideoStatisticResponseDto {
  @ApiProperty()
  @AutoMap()
  sharesCountAverage: number;

  @ApiProperty()
  @AutoMap()
  likesCountAverage: number;

  @ApiProperty()
  @AutoMap()
  viewsCountAverage: number;

  @ApiProperty()
  @AutoMap()
  commentsCountAverage: number;

  @ApiProperty()
  @AutoMap()
  totalVideos: number;
}
