import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class TiktokAuthDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => decodeURI(value))
  code: string;

  @ApiProperty({ isArray: true, type: String })
  @AutoMap()
  @IsNotEmpty()
  @IsArray()
  scopes: [string];
}
