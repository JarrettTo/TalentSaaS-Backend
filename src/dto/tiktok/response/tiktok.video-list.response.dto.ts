import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { TikTokVideoResponseDto } from "./tiktok.video.response.dto";

export class TikTokeVideoListResponseDto {
  
  @ApiProperty()
  @AutoMap()
  totalCount?: number;

  @ApiProperty()
  @AutoMap()
  username?: string;
  
  @ApiProperty({type: TikTokVideoResponseDto, isArray: true})
  @AutoMap(() => [TikTokVideoResponseDto])
  videos?: TikTokVideoResponseDto[];
}
