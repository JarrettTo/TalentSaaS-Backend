import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { YoutubeAgeResponseDto } from "./youtube.age.response.dto";
import { YoutubeCountryResponseDto } from "./youtube.country.response.dto";
import { YoutubeGenderResponseDto } from "./youtube.gender.response.dto";
import { YoutubeCompletionRateResponseDto } from "./youtube.completion-rate.response.dto";
import { YoutubeDeviceResponseDto } from "./youtube.device.response.dto";
import { YoutubeGrowsAndLossesResponseDto } from "./youtube.grows.response.dto";

export class YoutubeAllStatisticsResponseDto {
  @ApiProperty({ type: YoutubeAgeResponseDto, isArray: true })
  @AutoMap(() => [YoutubeAgeResponseDto])
  ages?: YoutubeAgeResponseDto[];

  @ApiProperty({ type: YoutubeGenderResponseDto })
  @AutoMap(() => YoutubeGenderResponseDto)
  genders?: YoutubeGenderResponseDto;

  @ApiProperty({ type: YoutubeCountryResponseDto, isArray: true })
  @AutoMap(() => [YoutubeCountryResponseDto])
  countries?: YoutubeCountryResponseDto[];

  @ApiProperty()
  @AutoMap()
  subscribersCount?: number;

  @ApiProperty()
  @AutoMap()
  views?: number;

  @ApiProperty()
  @AutoMap()
  viewsPerVideos?: number;

  @ApiProperty()
  @AutoMap()
  videoCount?: number;

  @ApiProperty({ type: YoutubeCompletionRateResponseDto })
  @AutoMap(() => YoutubeCompletionRateResponseDto)
  rate?: YoutubeCompletionRateResponseDto;

  @ApiProperty()
  @AutoMap()
  engagementRate?: number;

  @ApiProperty({ type: YoutubeDeviceResponseDto })
  @AutoMap(() => YoutubeDeviceResponseDto)
  devices?: YoutubeDeviceResponseDto;

  @ApiProperty({ type: YoutubeGrowsAndLossesResponseDto })
  @AutoMap(() => YoutubeGrowsAndLossesResponseDto)
  growsAndLosses?: YoutubeGrowsAndLossesResponseDto;
}
