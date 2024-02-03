import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { YoutubeVideoStatisticResponseDto } from "./youtube.video-statistic.response.dto";

export class YoutubeVideoListResponseDto {
  
  @ApiProperty()
  @AutoMap()
  totalCount?: number;
  
  @ApiProperty()
  @AutoMap(() => [YoutubeVideoStatisticResponseDto])
  videos?: YoutubeVideoStatisticResponseDto[];
}
