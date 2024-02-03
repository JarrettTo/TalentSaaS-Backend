import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { QuoteCreateDto } from "./quote.create.dto";

export class QuoteUpdateDto extends PartialType(QuoteCreateDto) {
}
