import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { TikTokMainStatisticResponseDto } from "./tiktok.main-statistic.response.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";
import { TiktokAllStatisticsResponseDto } from "./tiktok.all.statistics.response.dto";

export class TikTokLogStatisticResponseDto extends TiktokAllStatisticsResponseDto {
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
