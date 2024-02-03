import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { TikapiBaseResponseDto } from "./tikapi.base.response";

export class TikapiCountryResponseDto {
  @ApiProperty({ isArray: true, type: TikapiBaseResponseDto })
  @AutoMap(() => [TikapiBaseResponseDto])
  value: TikapiBaseResponseDto[];
}
