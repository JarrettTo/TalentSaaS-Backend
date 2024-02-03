import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/[\w]+[!@#${}\-_=+><;:?,|]*/)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
}
