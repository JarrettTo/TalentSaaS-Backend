import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class TiktokBusinessBaseResponseDto<T> {
  @ApiProperty()
  @AutoMap()
  code: number;

  @ApiProperty()
  @AutoMap()
  message: string;

  @ApiProperty()
  @AutoMap()
  @ValidateNested({ each: true })
  @Expose()
  data: T;
}
