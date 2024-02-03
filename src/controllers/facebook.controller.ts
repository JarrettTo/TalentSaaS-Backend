import { UniDecorators } from "@unistory/route-decorators";
import { FacebookTokenService } from "src/services/facebook-token.service";
import { Body, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { UniHttpException } from "@unistory/nestjs-common";
import { AuthGuard } from "@nestjs/passport";
import { CreateFacebookTokenDto } from "src/dto/facebook/facebook-token.create.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@UniDecorators.Controller("facebook")
export class FacebookController {
  public constructor(private readonly _facebookTokenService: FacebookTokenService) {}

  @UniDecorators.Get("register", "Redirect url for facebook")
  @ApiOperation({summary: "get facebook jwt tokens by auth token"})
  public async registerToken(@Query("accessToken") token: string, @Query("stamp") stamp: string): Promise<void> {
    if (token == null || stamp == null) {
      throw new UniHttpException("Need provide valid accessToken, stamp");
    }
    await this._facebookTokenService.registerToken(token, stamp);
  }

  @UniDecorators.Get("link/:influencerId", "Generate auth link")
  @ApiOperation({summary: "get link to auth in facebook"})
  @UseGuards(AuthGuard())
  public async generateAuthLink(@Param("influencerId", ParseIntPipe) id: number): Promise<string> {
    return await this._facebookTokenService.generateAuthLink(id);
  }

  @UniDecorators.Delete(":influencerId/disconnect", "disconnect facebook")
  @ApiOperation({summary: "sign out influencer's facebook"})
  @UseGuards(AuthGuard())
  public async disconnectToken(@Param("influencerId", ParseIntPipe) influencerId: number): Promise<number> {
    return await this._facebookTokenService.deleteFacebookToken(influencerId);
  }
}
