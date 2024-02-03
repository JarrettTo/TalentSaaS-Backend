import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class YoutubeChannelStatisticResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  viewCount: number;

  @ApiPropertyOptional()
  @AutoMap()
  subscriberCount: number;

  @ApiPropertyOptional()
  @AutoMap()
  hiddenSubscriberCount: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  videoCount: number;
}
