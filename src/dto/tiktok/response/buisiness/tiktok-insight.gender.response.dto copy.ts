import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TIkTokBusinessGenderInsightResponseDto {
  @ApiProperty()
  @AutoMap()
  gender: string;

  @ApiProperty()
  @AutoMap()
  percentage: number;
}