import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

export class PlacementCreateDto {
  @ApiProperty()
  @AutoMap()
  @IsEnum({ enum: PlacementType })
  @IsNotEmpty()
  type: PlacementType;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  talantFee: number;
}
