import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

import { ShortManagerDto } from "src/dto/manager/manager-short.dto";

export class ShortLogResponseDto {
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
