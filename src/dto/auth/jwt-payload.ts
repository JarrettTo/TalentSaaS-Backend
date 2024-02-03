import { ApiProperty } from "@nestjs/swagger";

export class JwtPayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  jti?: string;
}
