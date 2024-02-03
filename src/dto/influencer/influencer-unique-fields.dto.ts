import { IsNotEmpty, IsString } from "class-validator";

export class InfluencerUniqueFieldsDto {
  @IsString()
  @IsNotEmpty()
  tiktokProfile?: string;

  @IsString()
  @IsNotEmpty()
  instagramProfile: string;

  @IsString()
  @IsNotEmpty()
  youtubeProfile: string;
}
