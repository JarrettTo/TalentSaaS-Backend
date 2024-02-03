import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { QuoteResponseDto } from "./quote.dto";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";

export class QuoteLogResponseDto extends QuoteResponseDto{
  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty({ type: ShortManagerDto, required: false })
  @AutoMap(() => ShortManagerDto)
  manager?: ShortManagerDto;
}
