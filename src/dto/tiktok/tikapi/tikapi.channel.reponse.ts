import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TikapiChannelResponseDto {
  @ApiProperty()
  @AutoMap()
  diggCount: number;

  @ApiProperty()
  @AutoMap()
  followerCount: number;

  @ApiProperty()
  @AutoMap()
  followingCount: number;

  @ApiProperty()
  @AutoMap()
  heartCount: number;

  @ApiProperty()
  @AutoMap()
  videoCount: number;
}
