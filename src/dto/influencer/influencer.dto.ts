import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { LeftOrRigthEnum } from "src/infrastructure/enums/leftOrRight.enum";
import { InfluencerGroupResponseDto } from "./group/influencer-group.response.dto";
import { Type } from "class-transformer";

export class InfluencerDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiPropertyOptional()
  @AutoMap()
  firstname?: string;

  @ApiPropertyOptional()
  @AutoMap()
  lastname?: string;

  @ApiPropertyOptional()
  @AutoMap()
  email?: string;

  @ApiPropertyOptional()
  @AutoMap()
  phone?: string;

  @ApiPropertyOptional()
  @AutoMap()
  mediaKitLink?: string;

  @ApiPropertyOptional()
  @AutoMap()
  tiktokProfile?: string;

  @ApiPropertyOptional()
  @AutoMap()
  instagramProfile?: string;

  @ApiPropertyOptional()
  @AutoMap()
  youtubeProfile?: string;

  @ApiPropertyOptional()
  @AutoMap()
  streetAddress?: string;

  @ApiPropertyOptional()
  @AutoMap()
  TFN?: string;

  @ApiPropertyOptional()
  @AutoMap()
  bank?: string;

  @ApiPropertyOptional()
  @AutoMap()
  bankAccountName?: string;

  @ApiPropertyOptional()
  @AutoMap()
  bankBSB?: string;

  @ApiPropertyOptional()
  @AutoMap()
  bankAccountNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  isHelp?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  superFundName?: string;

  @ApiPropertyOptional()
  @AutoMap()
  superFundBillerCode?: string;

  @ApiPropertyOptional()
  @AutoMap()
  superFundReferenceNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  birthday?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  age?: number;

  @ApiPropertyOptional()
  @AutoMap()
  giftIdeas?: string;

  @ApiPropertyOptional()
  @AutoMap()
  havePartner?: string;

  @ApiPropertyOptional()
  @AutoMap()
  alcohol?: string;

  @ApiPropertyOptional()
  @AutoMap()
  leftOrRightHand?: LeftOrRigthEnum;

  @ApiPropertyOptional()
  @AutoMap()
  shoeSize?: string;

  @ApiPropertyOptional()
  @AutoMap()
  dreamHolidayDestination?: string;

  @ApiPropertyOptional()
  @AutoMap()
  dreamBrandCollaboration?: string;

  @ApiPropertyOptional()
  @AutoMap()
  dreamCar?: string;

  @ApiPropertyOptional()
  @AutoMap()
  milkOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  yourPhone?: string;

  @ApiPropertyOptional()
  @AutoMap()
  yourPhoneProvider?: string;

  @ApiPropertyOptional()
  @AutoMap()
  investmentService?: string;

  @ApiPropertyOptional()
  @AutoMap()
  supermarket?: string;

  @ApiPropertyOptional()
  @AutoMap()
  chemistOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  bottleshopOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  internetProvider?: string;

  @ApiPropertyOptional()
  @AutoMap()
  charityOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  streaming?: string;

  @ApiPropertyOptional()
  @AutoMap()
  musicStreamingOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  notes?: string;

  @ApiPropertyOptional()
  @AutoMap()
  avatar?: string;

  @ApiPropertyOptional()
  @AutoMap()
  isYoutubeConnected?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  isInstagramConnected?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  isTikTokConnected?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  isArchived?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  contractStartDate?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  contractEndDate?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  state?: string;

  @ApiPropertyOptional()
  @AutoMap()
  ABN?: string;

  @ApiPropertyOptional({ type: InfluencerGroupResponseDto })
  @AutoMap(() => InfluencerGroupResponseDto)
  @IsOptional()
  group?: InfluencerGroupResponseDto;
}
