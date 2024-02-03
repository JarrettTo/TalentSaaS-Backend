import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class JwtPairDto {
  @ApiProperty()
  @AutoMap()
  accessToken: string;

  @ApiProperty()
  @AutoMap()
  refreshToken: string;
}
