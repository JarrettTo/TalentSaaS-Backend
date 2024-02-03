import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class TiktokBusinessBasePermissionsResponseDto{

  @ApiProperty()
  @AutoMap()
  @Expose({name: "creator_id"})
  creatorId: string;
}


export class TiktokBusinessPermissionsBaseResponseDto {
  @ApiProperty()
  @AutoMap()
  code: number;

  @ApiProperty()
  @AutoMap()
  message: string;

  @ApiProperty()
  @AutoMap()
  @ValidateNested({each: true})
  @Expose()
  data: TiktokBusinessBasePermissionsResponseDto;
}