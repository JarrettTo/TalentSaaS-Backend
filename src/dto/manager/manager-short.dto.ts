import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ShortManagerDto {
  @ApiProperty()
  @AutoMap()
  email: string;
}
