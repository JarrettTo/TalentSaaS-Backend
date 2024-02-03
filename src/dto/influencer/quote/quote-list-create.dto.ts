import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { QuoteResponseDto } from "./quote.dto";
import { QuoteCreateDto } from "./quote.create.dto";
import { Type } from "class-transformer";

export class QuoteListCreateDto {
  
  @AutoMap()
  @ApiProperty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  brand: string;
  
  @ApiProperty({type: QuoteCreateDto, required: true, isArray: true})
  @AutoMap(() => [QuoteCreateDto])
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => QuoteCreateDto)
  quotes: QuoteCreateDto[]
}
