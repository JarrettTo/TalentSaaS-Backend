import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class TotalStatisticDto {
  @ApiProperty()
  @AutoMap()
  totalFollowers: number;

  @ApiProperty()
  @AutoMap()
  instagramFollowers: number;

  @ApiProperty()
  @AutoMap()
  youtubeFollowers: number;

  @ApiProperty()
  @AutoMap()
  tiktokFollowers: number;

  @ApiProperty()
  @AutoMap()
  totalViews: number;

  @ApiProperty()
  @AutoMap()
  instagramViews: number;

  @ApiProperty()
  @AutoMap()
  youtubeViews: number;

  @ApiProperty()
  @AutoMap()
  tiktokViews: number;

  @ApiProperty()
  @AutoMap()
  averageAllViewsPerPlatformCount: number;

  @ApiProperty()
  @AutoMap()
  totalEngagement: number;

  @ApiProperty()
  @AutoMap()
  instagramEngagement: number;

  @ApiProperty()
  @AutoMap()
  youtubeEngagement: number;

  @ApiProperty()
  @AutoMap()
  tiktokEngagement: number;

  @ApiProperty()
  @AutoMap()
  averageAllEngagementPerPlatformCount: number;
}
