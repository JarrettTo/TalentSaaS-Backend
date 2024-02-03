import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class YoutubeTokenCreateDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
