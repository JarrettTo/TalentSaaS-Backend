import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TIkTokBusinessCountryInsightResponseDto {
  @ApiProperty()
  @AutoMap()
  country: string;

  @ApiProperty()
  @AutoMap()
  percentage: number;
}