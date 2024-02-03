import { CountryResponseDto } from "./graph/country.response.dto";
import { GenderAgeResponseDto } from "./graph/gender-age.dto";

export class InfluencerInsightsDto {
  public countries: CountryResponseDto[];
  public gender: GenderAgeResponseDto[];
  public impressions: number;
  public engagement: number;
  public followersCount: number;
}
