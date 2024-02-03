import { ApiProperty } from "@nestjs/swagger";
import { BaseInsightStatisticResponseDto } from "./base-insight.response";
import { AutoMap } from "@automapper/classes";

export class InfluencerInsightsV18Dto {
  @ApiProperty({ type: BaseInsightStatisticResponseDto, isArray: true })
  @AutoMap(() => [BaseInsightStatisticResponseDto])
  public countries: BaseInsightStatisticResponseDto[];

  @ApiProperty({ type: BaseInsightStatisticResponseDto, isArray: true })
  @AutoMap(() => [BaseInsightStatisticResponseDto])
  public genders: BaseInsightStatisticResponseDto[];

  @ApiProperty({ type: BaseInsightStatisticResponseDto, isArray: true })
  @AutoMap(() => [BaseInsightStatisticResponseDto])
  public ages: BaseInsightStatisticResponseDto[];

  @ApiProperty({ type: BaseInsightStatisticResponseDto, isArray: true })
  @AutoMap(() => [BaseInsightStatisticResponseDto])
  public genderAges: BaseInsightStatisticResponseDto[];

  @ApiProperty()
  @AutoMap()
  public impressions: number;

  @ApiProperty()
  @AutoMap()
  public engagement: number;

  @ApiProperty()
  @AutoMap()
  public followersCount: number;
}
