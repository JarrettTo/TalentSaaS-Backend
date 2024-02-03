import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TikTokVideoResponseDto {
  
  @ApiProperty()
  @AutoMap()
  id?: string;

  @ApiProperty()
  @AutoMap()
  title?: string;

  @ApiProperty()
  @AutoMap()
  tiktokId?: string;
  
  @ApiProperty()
  @AutoMap()
  description?: string;
  
  @ApiProperty()
  @AutoMap()
  publishedAt?: Date;
  
  @ApiProperty()
  @AutoMap()
  views?: number;

  @ApiProperty()
  @AutoMap()
  comments?: number;

  @ApiProperty()
  @AutoMap()
  likes?: number;

}
