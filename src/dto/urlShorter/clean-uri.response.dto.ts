import { Expose } from "class-transformer";

export class CleanUriResponseDto {

  @Expose({name: "result_url"})
  url: string;
}

