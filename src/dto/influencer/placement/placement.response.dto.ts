import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

import { PlacementType } from "src/infrastructure/enums/placement.type.enum";
import { InfluencerDto } from "src/dto/influencer/influencer.dto";
import { ShortLogResponseDto } from "src/dto/short-log.dto";

export class PlacementResponseDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  type: PlacementType;

  @ApiProperty({ type: InfluencerDto })
  @AutoMap(() => InfluencerDto)
  influencer: InfluencerDto;

  @ApiProperty()
  @AutoMap()
  talantFee?: number;

  @ApiProperty()
  @AutoMap()
  agencyFee?: number;

  @ApiProperty()
  @AutoMap()
  totalImpressionsByCurrentMonth?: number;

  @ApiProperty()
  @AutoMap()
  AUorNZAuditory?: number;

  @ApiProperty()
  @AutoMap()
  westAuditory?: number;

  @ApiProperty()
  @AutoMap()
  sum?: number;

  @ApiProperty()
  @AutoMap()
  priceInUSD?: number;

  @ApiProperty()
  @AutoMap()
  priceInAUD?: number;

  @ApiProperty()
  @AutoMap()
  boosting?: number;

  @ApiProperty()
  @AutoMap()
  isItems?: boolean;

  @ApiProperty({ type: ShortLogResponseDto})
  @AutoMap(() => ShortLogResponseDto)
  lastLog?: ShortLogResponseDto;
}
