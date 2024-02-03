import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { TIkTokBusinessCountryInsightResponseDto } from "./tiktok-insight.country.response.dto";
import { TIkTokBusinessGenderInsightResponseDto } from "./tiktok-insight.gender.response.dto copy";
import { TIkTokBusinessAgeInsightResponseDto } from "./tiktok-insight.age.response.dto";
import { TIkTokBusinessDeviceInsightResponseDto } from "./tiktok-insight.device.response.dto";


// class Metrics {
//   @ApiProperty()
//   @AutoMap()
//   likes: number;

//   @ApiProperty()
//   @AutoMap()
//   comments: number;

//   @ApiProperty()
//   @AutoMap()
//   shares: number;

//   @ApiProperty()
//   @AutoMap()
//   @Expose({ name: "video_views" })
//   views: number;
// }

export class TiktokBusinessBaseInsightResponseDto {
  @ApiProperty({ isArray: true, type: TIkTokBusinessCountryInsightResponseDto })
  @AutoMap(() => [TIkTokBusinessCountryInsightResponseDto])
  @Expose({ name: "audience_countries" })
  audienceCountries: TIkTokBusinessCountryInsightResponseDto[];

  @ApiProperty({ isArray: true, type: TIkTokBusinessGenderInsightResponseDto })
  @AutoMap(() => [TIkTokBusinessGenderInsightResponseDto])
  @Expose({ name: "audience_genders" })
  audienceGenders: TIkTokBusinessGenderInsightResponseDto[];

  @ApiProperty({ isArray: true, type: TIkTokBusinessAgeInsightResponseDto })
  @AutoMap(() => [TIkTokBusinessAgeInsightResponseDto])
  @Expose({ name: "audience_ages" })
  audienceAges: TIkTokBusinessAgeInsightResponseDto[];

  @ApiProperty({ isArray: true, type: TIkTokBusinessDeviceInsightResponseDto })
  @AutoMap(() => [TIkTokBusinessDeviceInsightResponseDto])
  @Expose({ name: "audience_device" })
  audienceDevice: TIkTokBusinessDeviceInsightResponseDto[];

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "engagement_rate" })
  engagementRate: number;

}


// export class TiktokBusinessRowInsightResponseDto {
//   @ApiProperty({ isArray: true, type: TIkTokBusinessCountryInsightResponseDto })
//   @AutoMap(() => [TIkTokBusinessCountryInsightResponseDto])
//   @Expose({ name: "audience_countries" })
//   audienceCountries: TIkTokBusinessCountryInsightResponseDto[];

//   @ApiProperty({ isArray: true, type: TIkTokBusinessGenderInsightResponseDto })
//   @AutoMap(() => [TIkTokBusinessGenderInsightResponseDto])
//   @Expose({ name: "audience_genders" })
//   audienceGenders: TIkTokBusinessGenderInsightResponseDto[];

//   @ApiProperty({ isArray: true, type: TIkTokBusinessAgeInsightResponseDto })
//   @AutoMap(() => [TIkTokBusinessAgeInsightResponseDto])
//   @Expose({ name: "audience_ages" })
//   audienceAges: TIkTokBusinessAgeInsightResponseDto[];

//   @ApiProperty({ isArray: true, type: Metrics })
//   @AutoMap(() => [Metrics])
//   @Expose()
//   metrics: Metrics[];
// }

export class TiktokBusinessInsightResponseDto {
  @ApiProperty()
  @AutoMap()
  code: number;

  @ApiProperty()
  @AutoMap()
  message: string;

  @ApiProperty()
  @AutoMap()
  @ValidateNested({ each: true })
  @Expose()
  @Type(() => TiktokBusinessBaseInsightResponseDto)
  data: TiktokBusinessBaseInsightResponseDto;
}
