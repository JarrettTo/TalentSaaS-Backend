import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { YoutubeAgeResponseDto } from "./youtube.age.response.dto";
import { YoutubeCountryResponseDto } from "./youtube.country.response.dto";
import { YoutubeGenderResponseDto } from "./youtube.gender.response.dto";
import { YoutubeCompletionRateResponseDto } from "./youtube.completion-rate.response.dto";
import { YoutubeDeviceResponseDto } from "./youtube.device.response.dto";
import { YoutubeGrowsAndLossesResponseDto } from "./youtube.grows.response.dto";
import { YoutubeAllStatisticsResponseDto } from "./youtube.all.statistics.response.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";

export class YoutubeAllLogStatisticsResponseDto extends YoutubeAllStatisticsResponseDto {
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
