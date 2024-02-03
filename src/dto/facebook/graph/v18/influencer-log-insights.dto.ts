import { ApiProperty } from "@nestjs/swagger";
import { BaseInsightStatisticResponseDto } from "./base-insight.response";
import { AutoMap } from "@automapper/classes";
import { InfluencerInsightsV18Dto } from "./influencer-insights.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";

export class InfluencerLogInsightsV18Dto extends InfluencerInsightsV18Dto {
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
