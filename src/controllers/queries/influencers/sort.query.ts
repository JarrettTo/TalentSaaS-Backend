import { ApiProperty } from "@nestjs/swagger";

import { IsDefined, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderQuery } from "./order.query";

export class SortQuery {
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderQuery)
  @ApiProperty({ type: OrderQuery, required: false })
  order?: OrderQuery;
}
