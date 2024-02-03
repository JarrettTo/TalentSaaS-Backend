import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { LeftOrRigthEnum } from "src/infrastructure/enums/leftOrRight.enum";
import { InfluencerGroupResponseDto } from "./group/influencer-group.response.dto";
import { Type } from "class-transformer";

export class StrategyDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiPropertyOptional()
  @AutoMap()
  influencer?: number;

  @ApiPropertyOptional()
  @AutoMap()
  manager?: string;

  @ApiPropertyOptional()
  @AutoMap()
  tasks?: string;

  @ApiPropertyOptional()
  @AutoMap()
  PR?: string;

  @ApiPropertyOptional()
  @AutoMap()
  life?: string;

  @ApiPropertyOptional()
  @AutoMap()
  high_level?: string;

  @ApiPropertyOptional()
  @AutoMap()
  brand_strategy?: string;

  @ApiPropertyOptional()
  @AutoMap()
  content_tiktok?: string;

  @ApiPropertyOptional()
  @AutoMap()
  content_ig?: string;

  @ApiPropertyOptional()
  @AutoMap()
  content_yt?: string;

  @ApiPropertyOptional()
  @AutoMap()
  content_collabs?: string;

  @ApiPropertyOptional()
  @AutoMap()
  tour?: string;

  @ApiPropertyOptional()
  @AutoMap()
  hosting?: string;

  @ApiPropertyOptional()
  @AutoMap()
  podcast?: string;

  @ApiPropertyOptional()
  @AutoMap()
  film?: string;

  @ApiPropertyOptional()
  @AutoMap()
  projects?: string;
}
