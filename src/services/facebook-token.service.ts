import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { LoggerService } from "@unistory/nestjs-logger";
import { UniHttpException } from "@unistory/nestjs-common";
import { v4 as uuid } from "uuid";
import { firstValueFrom } from "rxjs";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { DebugTokenResponse } from "src/responses/facebook/debug-token.response";
import { FacebookConstant } from "src/infrastructure/constants/facebook.constant";
import { AxiosBaseResponse } from "src/responses/axios-base.response";
import { LongLiveTokenResponse } from "src/responses/facebook/long-live-token.response";
import { FbAccountResponse } from "src/responses/facebook/fb-account.response";
import { FacebookTokenRepository } from "src/DAL/repositories/facebook-token.repository";
import { InfluencerRepository } from "src/DAL/repositories/influencer.repository";
import { FacebookToken } from "src/DAL/entities/facebook-token.entity";
import { InfluencerEntity } from "src/DAL/entities/influencer.entity";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { InstagramInsightsEntity } from "src/DAL/entities/instagram/instagram.insights.entity";
import { DateHelper } from "src/infrastructure/utils/date.helper";
import { InstagramInsightsRepository } from "src/DAL/repositories/instagram/instagram.insights.repository";
import { CreateFacebookTokenDto } from "src/dto/facebook/facebook-token.create.dto";
import { UrlShorterService } from "./url-shortter.service";
import { InstagramInsightsService } from "./instagram-insights.service";

@Injectable()
export class FacebookTokenService {
  private readonly DebugTokenEndpoint = "debug_token";
  private readonly LongLiveTokenEndpoint = "v17.0/oauth/access_token";
  private readonly GrantTypeFbExchange = "fb_exchange_token";
  private readonly AccountsEndpoint = "v17.0/me/accounts?fields=instagram_business_account{username}";

  public constructor(
    private readonly _httpService: HttpService,
    private readonly _cfgService: ProjectConfigService,
    private readonly _logger: LoggerService,
    private readonly _facebookTokenRepo: FacebookTokenRepository,
    private readonly _instagramInsightRepo: InstagramInsightsRepository,
    private readonly _instagramInsightService: InstagramInsightsService,
    private readonly _influencerRepo: InfluencerRepository,

    private readonly _urlShorterService: UrlShorterService,
  ) {}

  public async generateAuthLink(influencerId: number): Promise<string> {
    const user = await this._influencerRepo.getById(influencerId);
    if (user == null || user.isArchived == true) {
      throw new UniHttpException("User not found");
    }

    if (user.instagramProfile == null) {
      throw new UniHttpException("Instagram username not provided");
    }

    const stamp =
      user.facebookTokenId != null
        ? await this.getFacebookStampFromExistingOrFail(user.facebookTokenId)
        : await this.createTokenAndGetStamp(user);

    const longUri = this.generateAuthUri(stamp);
    return await this._urlShorterService.generateShortLink(longUri);
  }
  public async registerByHands(influencerId: number, createTokenDto: CreateFacebookTokenDto): Promise<void> {
    const facebookToken = new FacebookToken();
    facebookToken.igId = createTokenDto.igId;
    facebookToken.value = createTokenDto.value;
    facebookToken.securityStamp = createTokenDto.securityStamp;

    await this._facebookTokenRepo.save(facebookToken);

    const influencer = await this._influencerRepo.getById(influencerId);

    influencer.facebookTokenId = facebookToken.id;
    influencer.facebookToken = facebookToken;

    await this._influencerRepo.save(influencer);

    const localInsight = new InstagramInsightsEntity();
    localInsight.influencer = influencer;
    localInsight.date = DateHelper.getYesterday();

    await this._instagramInsightRepo.save(localInsight);
  }
  public async registerToken(inputToken: string, stamp: string): Promise<void> {
    const fbToken = await this._facebookTokenRepo.getBySecurityStamp(stamp);
    if (fbToken == null) {
      throw new UniHttpException("Incorrect stamp");
    }

    if (fbToken.value != null) {
      throw new UniHttpException("Token already set");
    }

    await this.ensureIsValidToken(inputToken);
    fbToken.value = await this.getLongLiveToken(inputToken);
    const accounts = await this.sendGetRequest(this.generateGetAccountsUri(fbToken.value), FbAccountResponse);

    const influencer = await this._influencerRepo.getByFbTokenIdOrFail(fbToken.id);
    fbToken.igId = this.getInstagramIdOrFail(influencer.instagramProfile, accounts);

    await fbToken.save();

    const localInsight = new InstagramInsightsEntity();
    localInsight.influencer = influencer;
    localInsight.date = DateHelper.getYesterday();
    await this._instagramInsightRepo.save(localInsight);
    await this._instagramInsightService.updateLocalDbStatistic(influencer.id);
  }

  private async getFacebookStampFromExistingOrFail(tokenId: number): Promise<string> {
    const fbToken = await this._facebookTokenRepo.getById(tokenId);
    if (fbToken.value != null) {
      throw new UniHttpException("Token already set");
    }

    return fbToken.securityStamp;
  }

  private async createTokenAndGetStamp(user: InfluencerEntity): Promise<string> {
    const fbToken = new FacebookToken();
    fbToken.securityStamp = uuid();
    user.facebookToken = fbToken;

    await this._facebookTokenRepo.save(fbToken);
    await this._influencerRepo.save(user);

    return fbToken.securityStamp;
  }

  private generateAuthUri(stamp: string): string {
    const uri = new URL(FacebookConstant.FacebookAuthUrl);
    this.appendAuthQuery(uri, stamp);
    return uri.toString();
  }

  private appendAuthQuery(uri: URL, stamp: string) {
    uri.searchParams.append("client_id", this._cfgService.facebookCfg.clientId);
    uri.searchParams.append("redirect_uri", this._cfgService.facebookCfg.redirectUri);
    uri.searchParams.append("scope", FacebookConstant.scopes.join(","));
    uri.searchParams.append("response_type", "token");
    uri.searchParams.append("auth_type", "rerequest");
    uri.searchParams.append("display", "popup");
    uri.searchParams.append("state", stamp);
  }

  private getInstagramIdOrFail(username: string, accounts: FbAccountResponse): string {
    for (const item of accounts.data) {
      console.log("THIS USERNAMEEEE:   ", item.igBusinessAccount.username)
      if (item.igBusinessAccount != null && item.igBusinessAccount.username == username) {
        return item.igBusinessAccount.id;
      }
    }

    throw new UniHttpException("Target instagram account not connected");
  }

  private async sendGetRequest<TResponse>(uri: string, ctor: ClassConstructor<TResponse>): Promise<TResponse> {
    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<unknown>>(this._httpService.get(uri));
      return plainToInstance(ctor, rawRes.data);
    } catch (e) {
      this._logger.warn("Error near sending FB request\nUri = {U}\nResponse = {R}", uri, e);
      throw new UniHttpException("FB error");
    }
  }

  private generateGetAccountsUri(token: string): string {
    const uri = new URL(`${FacebookConstant.GraphUrl}${this.AccountsEndpoint}`);
    uri.searchParams.append("access_token", token);
    return uri.toString();
  }

  private async getLongLiveToken(tmpToken: string): Promise<string> {
    const response = await this.sendGetRequest(this.generateLongLiveTokenUri(tmpToken), LongLiveTokenResponse);

    if (response.accessToken == null) {
      throw new UniHttpException("FB error");
    }

    return response.accessToken;
  }

  private generateLongLiveTokenUri(tmpToken: string): string {
    const uri = new URL(`${FacebookConstant.GraphUrl}${this.LongLiveTokenEndpoint}`);
    this.appendLongLiveTokenQuery(uri, tmpToken);
    return uri.toString();
  }

  private async ensureIsValidToken(inputToken: string): Promise<void> {
    const response = await this.sendGetRequest(this.generateDebugTokenUri(inputToken), DebugTokenResponse);

    if (!this.validateScopes(response.data.scopes)) {
      throw new UniHttpException("Incorrect scopes");
    }

    if (response.data.appId != this._cfgService.facebookCfg.clientId) {
      throw new UniHttpException("Incorrect token");
    }
  }

  private generateDebugTokenUri(inputToken: string): string {
    const uri = new URL(`${FacebookConstant.GraphUrl}${this.DebugTokenEndpoint}`);
    this.appendDebugTokenQuery(uri, inputToken);
    return uri.toString();
  }

  private appendDebugTokenQuery(uri: URL, inputToken: string) {
    const accessToken = `${this._cfgService.facebookCfg.clientId}|${this._cfgService.facebookCfg.clientSecret}`;
    uri.searchParams.append("access_token", accessToken);
    uri.searchParams.append("input_token", inputToken);
  }

  private validateScopes(scopes: string[]): boolean {
    return FacebookConstant.scopes.every((x) => scopes.includes(x));
  }

  private appendLongLiveTokenQuery(uri: URL, tmpToken: string) {
    uri.searchParams.append("client_id", this._cfgService.facebookCfg.clientId);
    uri.searchParams.append("client_secret", this._cfgService.facebookCfg.clientSecret);
    uri.searchParams.append("fb_exchange_token", tmpToken);
    uri.searchParams.append("grant_type", this.GrantTypeFbExchange);
  }

  public async setDefaultInsight(influencerId: number): Promise<void> {
    const influecnersWithInsights = await this._influencerRepo.getAllWithInsights();

    const newInsights: InstagramInsightsEntity[] = [];

    for (const influencer of influecnersWithInsights) {
      if (influencer.instagramInsight == null && influencer.id == influencerId) {
        const newInstagramInsight = new InstagramInsightsEntity();
        newInstagramInsight.influencer = influencer;
        newInstagramInsight.date = DateHelper.getYesterday();
        newInsights.push(newInstagramInsight);
      }
    }
    await this._instagramInsightRepo.saveRange(newInsights);
  }

  public async deleteFacebookToken(influencerId: number): Promise<number> {
    const influencer = await this._influencerRepo.getWithFacebookTokenAndInsight(influencerId);
    console.log("influencer.facebookToken=", influencer.facebookToken);
    console.log("influencer.instagramInsight=", influencer.instagramInsight);
    if (influencer.facebookToken == null || influencer.instagramInsight == null) {
      throw new NotFoundException(`influencer with id ${influencerId} not connected to Facebook!`);
    }

    const token = influencer.facebookToken;
    const insight = influencer.instagramInsight;

    influencer.facebookToken = null;
    await this._influencerRepo.save(influencer);
    await this._facebookTokenRepo.remove(token);
    await this._instagramInsightRepo.remove(insight);

    return influencerId;
  }
}
