import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TikapiBaseResponseDto } from "./tikapi.base.response";

export class TikapiGenderResponseDto {
  @ApiProperty({ isArray: true, type: TikapiBaseResponseDto })
  @AutoMap(() => [TikapiBaseResponseDto])
  value: TikapiBaseResponseDto[];
}
