import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class YoutubeAuthDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  verifyCode: string;

  @ApiProperty({ isArray: true, type: String })
  @AutoMap()
  @IsNotEmpty()
  @IsArray()
  scopes: [string];
}
