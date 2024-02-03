import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

export class PlacementUpdateDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  talantFee?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  agencyFee?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  totalImpressionsByCurrentMonth?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  AUorNZAuditory?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  westAuditory?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  sum?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  priceInUSD?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  priceInAUD?: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  boosting?: number;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  isItems?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsEnum(PlacementType)
  @IsNotEmpty()
  type: PlacementType;
}
