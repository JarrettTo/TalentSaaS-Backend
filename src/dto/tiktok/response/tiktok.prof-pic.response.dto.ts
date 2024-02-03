import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class TikTokProfilePictureResponseDto {
  @ApiProperty()
  @AutoMap()
  avatarUrl: string;
}
