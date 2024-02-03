import { Type } from "class-transformer";
import { type } from "os";
import { ClassConstructor } from "class-transformer";
import { ValidateNested } from "class-validator";

export class TikTokBaseResponseDto<TData> {
  data: TData;
}
