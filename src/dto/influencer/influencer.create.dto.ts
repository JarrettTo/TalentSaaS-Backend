import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from "class-validator";
import { LeftOrRigthEnum } from "src/infrastructure/enums/leftOrRight.enum";
import { StateOfAustraliaEnum } from "./../../infrastructure/enums/stateOfAustralia.enum";

export class InfluencerCreateDto {
  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsUrl()
  @IsOptional()
  mediaKitLink?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  tiktokProfile?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  instagramProfile?: string;

  @ApiPropertyOptional({ uniqueItems: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  youtubeProfile?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  streetAddress?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  TFN?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  bank?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  bankAccountName?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  bankBSB?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  bankAccountNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  isHelp?: boolean;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  superFundName?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  superFundBillerCode?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  superFundReferenceNumber?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  age?: number;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  giftIdeas?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  havePartner?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  alcohol?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsEnum(LeftOrRigthEnum)
  @IsNotEmpty()
  @IsOptional()
  leftOrRightHand: LeftOrRigthEnum;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  shoeSize?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  dreamHolidayDestination?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  dreamBrandCollaboration?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  dreamCar?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  milkOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  yourPhone?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  yourPhoneProvider?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  investmentService?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  supermarket?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  chemistOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  bottleshopOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  internetProvider?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  charityOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  streaming?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  musicStreamingOfChoice?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  contractStartDate?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  contractEndDate?: Date;

  @ApiPropertyOptional()
  @AutoMap()
  @IsEnum(StateOfAustraliaEnum)
  @IsOptional()
  state?: StateOfAustraliaEnum;

  @ApiPropertyOptional()
  @AutoMap()
  @IsString()
  @Length(11, 11)
  @IsOptional()
  ABN?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  groupName?: string;
}
