import { ApiProperty } from "@nestjs/swagger";

export class ICountedItems<T> {
  
  @ApiProperty()
  totalCount: number;
  
  @ApiProperty()
  items: T[];
}
