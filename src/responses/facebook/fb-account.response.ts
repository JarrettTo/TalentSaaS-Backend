import { Expose, Type } from "class-transformer";

class BusinessAccount {
  public username: string;
  public id: string;
}

class Account {
  @Expose({ name: "instagram_business_account" })
  public igBusinessAccount: BusinessAccount;
}

export class FbAccountResponse {
  @Type(() => Account)
  public data: Account[] = [];
}
