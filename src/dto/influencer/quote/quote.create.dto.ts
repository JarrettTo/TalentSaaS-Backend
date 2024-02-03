import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
export class QuoteCreateDto {

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  influencerId: number;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  totalFee: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  crossPost?: number;
  
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  instaStorySet?: number;
  
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  linkInBio?: number;
 
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationDigital?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationDigitalMonths?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationDigitalMonthsRange?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationTraditional?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationTraditionalMonths?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amplificationTraditionalMonthsRange?: number;
  
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  exclusivity?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  exclusivityMonths?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  exclusivityMonthsRange?: number;
  
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  shootDay?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  paidMedia?: number;
  
  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  UGCCreative?: number;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isInstagram: boolean=false;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isYoutube: boolean=false;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isTiktok: boolean=false;
}
