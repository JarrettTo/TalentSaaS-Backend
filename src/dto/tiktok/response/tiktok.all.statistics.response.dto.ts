import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { TiktokAgeResponseDto } from "./tiktok.age.response.dto";
import { TiktokCountryResponseDto } from "./tiktok.country.response.dto";
import { TiktokGenderResponseDto } from "./tiktok.gender.response.dto";
import { TiktokDeviceResponseDto } from "./tiktok.device.response.dto";

export class TiktokAllStatisticsResponseDto {
  @ApiProperty({ type: TiktokAgeResponseDto, isArray:true })
  @AutoMap(() => TiktokAgeResponseDto)
  ages: TiktokAgeResponseDto[];

  @ApiProperty({ type: TiktokGenderResponseDto })
  @AutoMap(() => TiktokGenderResponseDto)
  genders: TiktokGenderResponseDto;

  @ApiProperty({ type: TiktokCountryResponseDto,isArray: true })
  @AutoMap(() => [TiktokCountryResponseDto])
  countries: TiktokCountryResponseDto[];

  @ApiProperty({ type: TiktokDeviceResponseDto,isArray: true })
  @AutoMap(() => [TiktokDeviceResponseDto])
  devices: TiktokDeviceResponseDto[];

  @ApiProperty()
  @AutoMap()
  followersCount: number;

  @ApiProperty()
  @AutoMap()
  likesCount: number;

  @ApiProperty()
  @AutoMap()
  videosCount: number;

  @ApiProperty()
  @AutoMap()
  viewsAverage: number;
}
