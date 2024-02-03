import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TikapiBaseResponseDto {
  @ApiProperty()
  @AutoMap()
  key: string;

  @ApiProperty()
  @AutoMap()
  value: number;
}
