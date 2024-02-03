import { ApiProperty } from "@nestjs/swagger";

import { IsDefined, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderTypesEnum } from "../order.types.enum";
import { Transform } from "class-transformer";

export class OrderGroupQuery {
  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  id?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  name?: OrderTypesEnum;
}
