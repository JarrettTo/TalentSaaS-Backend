export class FacebookCfg {
  public clientId: string;
  public clientSecret: string;
  public redirectUri: string;

  public constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }
}
