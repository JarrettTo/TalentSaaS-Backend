import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "@unistory/nestjs-logger";
import { plainToInstance } from "class-transformer";

import { firstValueFrom } from "rxjs";
import { CleanUriResponseDto } from "src/dto/urlShorter/clean-uri.response.dto";

import { AxiosBaseResponse } from "src/responses/axios-base.response";

@Injectable()
export class UrlShorterService {
  private readonly baseClickRuApiUri = "https://clck.ru/--?";
  private readonly baseCleanUriApiUri = "https://cleanuri.com/api/v1/shorten";

  constructor(private readonly _httpService: HttpService, private readonly _logger: LoggerService) {}

  public async generateShortLinkByClickRu(longUrl: string): Promise<string> {
    const url = new URL(this.baseClickRuApiUri);
    url.searchParams.append("url", longUrl);

    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<string>>(this._httpService.post(url.toString(), {}));
      const shortUrl = plainToInstance(String, rawRes.data) as string;
      return shortUrl;
    } catch (error) {
      this._logger.warn("error when generate short link", error.message);
      throw new Error("Something went wrong when generate short link ")
    }
  }

  // https://cleanuri.com/api/v1/shorten
  public async generateShortLinkByCleanUriService(longUrl: string): Promise<string> {
    const url = new URL(this.baseCleanUriApiUri);
    url.searchParams.append("url", longUrl);

    try {
      const rawRes = await firstValueFrom<AxiosBaseResponse<CleanUriResponseDto>>(this._httpService.post(url.toString(), {
        url: longUrl
      }));
      const shortUrl = plainToInstance(CleanUriResponseDto, rawRes.data);
      return shortUrl.url;
    } catch (error) {
      this._logger.warn("error when generate short link", error.message);
      throw new Error("Something went wrong when generate short link ")
    }
  }

  public async generateShortLink(longUrl: string): Promise<string> {
    
    try {
      return await this.generateShortLinkByCleanUriService(longUrl);
    } catch (error) {
      return await this.generateShortLinkByClickRu(longUrl);
    }
  }
}
