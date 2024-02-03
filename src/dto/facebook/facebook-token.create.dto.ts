import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFacebookTokenDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  value: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  igId: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  securityStamp: string;
}
