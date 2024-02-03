import { CountryResponseDto } from "./country.response.dto";
import { GenderAgeResponseDto } from "./gender-age.dto";

export class GenderAgeCountriesDto {
  public countries: CountryResponseDto[];
  public genderAge: GenderAgeResponseDto[];
}
