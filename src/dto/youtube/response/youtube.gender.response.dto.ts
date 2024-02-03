import { AutoMap } from "@automapper/classes";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class YoutubeGenderResponseDto {
  @ApiPropertyOptional()
  @AutoMap()
  male?: number;

  @ApiPropertyOptional()
  @AutoMap()
  female?: number;

  @ApiPropertyOptional()
  @AutoMap()
  genderUserSpecified?: number;
}
