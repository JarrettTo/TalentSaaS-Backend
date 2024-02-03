import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class InfluencerPlatformsDto {
  @ApiProperty()
  @AutoMap()
  tiktok?: string[] = [];

  @ApiProperty()
  @AutoMap()
  instagram?: string[] = [];

  @ApiProperty()
  @AutoMap()
  youtube?: string[] = [];
}
