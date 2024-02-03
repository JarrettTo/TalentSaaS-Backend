import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class TikTokBaseUserResponseDto {
  @ApiProperty()
  @AutoMap()
  @Expose({ name: "follower_count" })
  followersCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "likes_count" })
  likesCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "video_count" })
  videosCount: number;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "display_name" })
  displayName: string;

  @ApiProperty()
  @AutoMap()
  @Expose({ name: "avatar_url_100" })
  avatarUrl: string;

  @ApiProperty()
  @AutoMap()
  username: string;
}

export class TikTokUserInfoResponseDto {
  @Type(() => TikTokBaseUserResponseDto)
  user: TikTokBaseUserResponseDto;
}
