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
  IsUrl,
  Length,
  Matches,
} from "class-validator";

export class StrategyCreateDto {
  @ApiPropertyOptional()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  influencer?: number;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  manager?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  tasks?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  PR?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  life?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  high_level?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  brand_strategy?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  content_tiktok?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  content_ig?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  content_yt?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  content_collabs?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  tour?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  hosting?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  podcast?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  film?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  projects?: string;

  
}
