import { InstagramInsightsService } from "src/services/instagram-insights.service";
import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { InfluencerInsightsDto } from "src/dto/facebook/influencer-insights.dto";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller("dev-instagram")
@ApiExcludeController()
export class DevInstagramInsightsController {
  public constructor(private readonly _service: InstagramInsightsService) {}

  @Get("insights")
  public async getAllInsights() {
    return await this._service.getAllInsights();
  }

  @Delete("insights/:insightId")
  public async getOne(@Param("insightId") insightId: number) {
    return await this._service.deleteInsight(insightId);
  }
}
