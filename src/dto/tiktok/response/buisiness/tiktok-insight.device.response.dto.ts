import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TIkTokBusinessDeviceInsightResponseDto {
  @ApiProperty()
  @AutoMap()
  device: string;

  @ApiProperty()
  @AutoMap()
  percentage: number;
}
