import { Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UniDecorators } from "@unistory/route-decorators";

import { TotalStatisticService } from "src/services/total-statistic.service";
import { TotalStatisticDto } from "src/dto/statistic/total-statistic.dto";
import { ApiOperation } from "@nestjs/swagger";

@UniDecorators.Controller("total-statistic")
export class TotalStatisticController {
  public constructor(private readonly _service: TotalStatisticService) {}

  @UniDecorators.Get("statistic", "Last total statistic for all influencers", false, TotalStatisticDto)
  @ApiOperation({summary: "get Last total statistic for all influencers"})
  @UseGuards(AuthGuard())
  public async getLastStatistic(): Promise<TotalStatisticDto> {
    return await this._service.getLastTotalStatistic();
  }
  @UniDecorators.Post("statistic/verify-code/generate", "", false, String)
  @ApiOperation({summary: "get verify code to get last total statistic for all influencers"})
  @UseGuards(AuthGuard())
  public async generateStatisticVerifyCode(): Promise<string> {
    return await this._service.generateStatisticVerifyCode();
  }

  @UniDecorators.Get("statistic/unauthorized/:verifyCode/", "", false, TotalStatisticDto)
  @ApiOperation({summary: "get last total statistic for unauthorized user"})
  public async getInsightsForUnauthorizedUser(@Param("verifyCode") verifyCode: string): Promise<TotalStatisticDto> {
    return await this._service.getInsightsForUnauthorizedUser(verifyCode);
  }
}
