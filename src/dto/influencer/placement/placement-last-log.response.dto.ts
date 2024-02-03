import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { PlacementResponseDto } from "./placement.response.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";

export class PlacementLastLogResponseDto extends PlacementResponseDto{
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
