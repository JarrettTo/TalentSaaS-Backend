import { ApiProperty } from "@nestjs/swagger";

import { IsDefined, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderTypesEnum } from "../order.types.enum";

export class OrderInfluencerQuery {
  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  id?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  firstname?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  lastname?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  state?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  contractStartDate?: OrderTypesEnum;

  @IsOptional()
  @IsEnum(OrderTypesEnum)
  @ApiProperty({ enum: OrderTypesEnum })
  contractEndDate?: OrderTypesEnum;
}
