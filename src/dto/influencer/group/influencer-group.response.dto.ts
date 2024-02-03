import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";

export class InfluencerGroupResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;
}
