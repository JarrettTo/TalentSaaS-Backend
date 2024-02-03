import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class TikTokMainStatisticResponseDto {
  @ApiProperty()
  @AutoMap()
  followersCount: number;

  @ApiProperty()
  @AutoMap()
  likesCount: number;

  @ApiProperty()
  @AutoMap()
  videosCount: number;
}
