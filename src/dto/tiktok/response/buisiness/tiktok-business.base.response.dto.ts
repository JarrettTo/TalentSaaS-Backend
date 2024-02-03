import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class TiktokBusinessBaseResponseDto<T> {
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
  data: T;
}
