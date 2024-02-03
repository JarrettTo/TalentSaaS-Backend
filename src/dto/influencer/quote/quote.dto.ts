import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { InfluencerDto } from "../influencer.dto";

export class QuoteResponseDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  talentFee: number;

  @AutoMap()
  @ApiProperty()
  totalFee: number;

  @AutoMap()
  @ApiProperty()
  quoteId: number;

  @ApiProperty()
  @AutoMap()
  expiredAt: Date;

  @AutoMap()
  @ApiProperty()
  crossPost?: number;

  @AutoMap()
  @ApiProperty()
  instaStorySet?: number;

  @AutoMap()
  @ApiProperty()
  linkInBio?: number;

  @AutoMap()
  @ApiProperty()
  amplificationDigital?: number;

  @AutoMap()
  @ApiProperty()
  amplificationDigitalMonths?: number;

  @AutoMap()
  @ApiProperty()
  amplificationDigitalMonthsRange?: number;

  @AutoMap()
  @ApiProperty()
  amplificationTraditional?: number;

  @ApiProperty()
  @AutoMap()
  amplificationTraditionalMonths?: number;

  @ApiProperty()
  @AutoMap()
  amplificationTraditionalMonthsRange?: number;

  @AutoMap()
  @ApiProperty()
  exclusivity?: number;

  @AutoMap()
  @ApiProperty()
  exclusivityMonths?: number;

  @AutoMap()
  @ApiProperty()
  exclusivityMonthsRange?: number;

  @AutoMap()
  @ApiProperty()
  shootDay?: number;

  @AutoMap()
  @ApiProperty()
  paidMedia?: number;

  @AutoMap()
  @ApiProperty()
  UGCCreative?: number;

  @AutoMap()
  @ApiProperty()
  isInstagram?: boolean;

  @AutoMap()
  @ApiProperty()
  isYoutube?: boolean;

  @AutoMap()
  @ApiProperty()
  isTiktok?: boolean;

  @AutoMap()
  @ApiProperty()
  isArchived?: boolean;

  @AutoMap(() => InfluencerDto)
  @ApiProperty()
  influencer?: InfluencerDto;
}
