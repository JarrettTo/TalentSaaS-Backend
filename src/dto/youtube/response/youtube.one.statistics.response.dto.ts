import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { YoutubeAgeResponseDto } from "./youtube.age.response.dto";
import { YoutubeCountryResponseDto } from "./youtube.country.response.dto";
import { YoutubeGenderResponseDto } from "./youtube.gender.response.dto";
import { YoutubeDeviceResponseDto } from "./youtube.device.response.dto";

export class YoutubeOneStatisticsResponseDto {
  @ApiProperty({ type: YoutubeAgeResponseDto, isArray: true })
  @AutoMap(() => [YoutubeAgeResponseDto])
  ages: YoutubeAgeResponseDto[];

  @ApiProperty({ type: YoutubeGenderResponseDto })
  @AutoMap(() => YoutubeGenderResponseDto)
  genders: YoutubeGenderResponseDto;

  @ApiProperty({ type: YoutubeCountryResponseDto, isArray: true })
  @AutoMap(() => [YoutubeCountryResponseDto])
  countries: YoutubeCountryResponseDto[];

  @ApiProperty({ type: YoutubeDeviceResponseDto })
  @AutoMap(() => YoutubeDeviceResponseDto)
  devices: YoutubeDeviceResponseDto;

  @ApiProperty()
  @AutoMap()
  views: number;

  @ApiProperty()
  @AutoMap()
  comments: number;

  @ApiProperty()
  @AutoMap()
  likes: number;

  @ApiProperty()
  @AutoMap()
  dislikes: number;
}
