import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";

export class DateRequestDto {
  @ApiProperty({ pattern: "2022-12-24", required: false })
  @AutoMap()
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
  from?: string;

  @ApiProperty({ pattern: "2023-12-24", required: false })
  @AutoMap()
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
  to?: string;
}
