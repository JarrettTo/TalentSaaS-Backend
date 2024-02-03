import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TIkTokBusinessAgeInsightResponseDto {
  @ApiProperty()
  @AutoMap()
  age: string;

  @ApiProperty()
  @AutoMap()
  percentage: number;
}
