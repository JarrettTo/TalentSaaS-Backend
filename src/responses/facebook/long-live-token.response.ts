import { Expose } from "class-transformer";

export class LongLiveTokenResponse {
  @Expose({ name: "access_token" })
  public accessToken: string;
}
