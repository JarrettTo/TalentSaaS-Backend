import { BaseInsightStatisticResponseDto } from "./base-insight.response";

export class GenderAgeCountriesV18Dto {
  public countries: BaseInsightStatisticResponseDto[];
  public genders: BaseInsightStatisticResponseDto[];
  public ages: BaseInsightStatisticResponseDto[];
  public genderAges: BaseInsightStatisticResponseDto[];
}
