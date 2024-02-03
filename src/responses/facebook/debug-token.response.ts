import { Expose, Type } from "class-transformer";

class Data {
  @Expose({ name: "app_id" })
  public appId: "";
  public scopes: string[] = [];
}

export class DebugTokenResponse {
  @Type(() => Data)
  public data: Data;
}
