import { ApiProperty } from "@nestjs/swagger";

import { IsDefined, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderTypesEnum } from "../order.types.enum";
import { OrderInfluencerQuery } from "./order.influencer.query";
import { OrderGroupQuery } from "./order.group.query";
import { Type } from "class-transformer";

export class OrderQuery {
  @IsOptional()
  @ApiProperty({ type: OrderInfluencerQuery })
  @ValidateNested()
  @Type(() => OrderInfluencerQuery)
  influencer?: OrderInfluencerQuery;

  @IsOptional()
  @ApiProperty({ type: OrderGroupQuery })
  @ValidateNested()
  @Type(() => OrderGroupQuery)
  group?: OrderGroupQuery;
}
