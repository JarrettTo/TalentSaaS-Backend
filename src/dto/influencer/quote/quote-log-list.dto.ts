import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { QuoteLogResponseDto } from "./quote-log.dto";

export class QuoteLogListResponseDto extends QuoteLogResponseDto{

  @ApiProperty({ required: false })
  @AutoMap(() => [QuoteLogResponseDto])
  quotesLogs: QuoteLogResponseDto[];
}
