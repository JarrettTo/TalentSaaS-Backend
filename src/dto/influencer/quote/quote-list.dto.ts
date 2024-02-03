import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { QuoteResponseDto } from "./quote.dto";

export class QuoteListResponseDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  brand: string;

  @ApiProperty()
  @AutoMap()
  verifyCode: string;

  @ApiProperty()
  @AutoMap()
  expiredAt: Date;

  @ApiProperty({ type: QuoteResponseDto, isArray: true })
  @AutoMap(() => [QuoteResponseDto])
  quotes: QuoteResponseDto[];
}
