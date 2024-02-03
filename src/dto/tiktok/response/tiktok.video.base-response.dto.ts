import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";

export class TikTokBaseVideoResponseDto {
  
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "id" })
  id: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "title" })
  title: string;
  
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "video_description" })
  videoDescription: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "create_time" })
  createTime: number;
  
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "share_count" })
  sharesCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "like_count" })
  likesCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "view_count" })
  viewsCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "comment_count" })
  commentsCount: number;

}

export class TikTokVideosResponseDto {
  @AutoMap()
  @IsNumber()
  cursor: number;
  
  @AutoMap()
  @IsBoolean()
  has_more: boolean

  @Type(() => TikTokBaseVideoResponseDto)
  videos: TikTokBaseVideoResponseDto[];
}
