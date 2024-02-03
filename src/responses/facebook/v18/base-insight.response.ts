import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";

class Result {
  @Expose({ name: "dimension_values" })
  dimensionValues: string[];

  value: number;
}

class Breakdowns {
  @ValidateNested({ each: true })
  @Type(() => Result)
  results: Result[];
}

class TotalValue {
  @ValidateNested()
  @Type(() => Breakdowns)
  breakdowns: Breakdowns[];
}

class Data {
  @Expose({ name: "total_value" })
  @ValidateNested()
  @Type(() => TotalValue)
  totalValue: TotalValue;
}

export class BaseInsightResponse {
  @ValidateNested({ each: true })
  @Type(() => Data)
  data: Data[];
}
