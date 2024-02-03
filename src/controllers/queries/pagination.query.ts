import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Max, Min } from "class-validator";

import { TransformUtil } from "src/infrastructure/utils/transform.util";

export class PaginationQuery {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(50)
  @Transform(TransformUtil.toNumber)
  limit: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(0)
  @Transform(TransformUtil.toNumber)
  offset: number;
}
