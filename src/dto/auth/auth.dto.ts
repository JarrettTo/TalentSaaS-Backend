import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Matches(/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]/)
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/[\w]+[!@#${}\-_=+><;:?,|]*/)
  password: string;
}
