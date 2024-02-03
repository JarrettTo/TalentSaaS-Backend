import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class TiktokGenderResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  male?: number;

  @ApiPropertyOptional()
  @AutoMap()
  female?: number;

  @ApiPropertyOptional()
  @AutoMap()
  another?: number;
}
