import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiOperation } from "@nestjs/swagger";

import { JwtPairDto } from "src/dto/auth/jwt-pair.dto";
import { RefreshTokenDto } from "src/dto/auth/refresh-token.dto";
import { AuthService } from "src/services/auth.service";
import { AuthDto } from "src/dto/auth/auth.dto";
import { ConfirmEmailTokenDto } from "src/dto/auth/rconfirm-email-token.dto";
import { ForgotPasswordDto } from "src/dto/auth/forgot-password.dto";
import { ResetPasswordDto } from "src/dto/auth/reset-password.dto";
@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) { }

  @Post("sign-in")
  @ApiOperation({summary: "sign in in system"})  
  @ApiOkResponse({ type: JwtPairDto })
  public async signIn(@Body() dto: AuthDto): Promise<JwtPairDto> {
    return await this._authService.signIn(dto);
  }

  @Post("sign-up")
  @ApiOperation({summary: "sign up in system"})  
  @ApiOkResponse()
  public async signUp(@Body() dto: AuthDto): Promise<void> {
    await this._authService.signUp(dto);
  }

  @Post("resend-email-token")
  @ApiOperation({summary: "resending a token to verify email"}) 
  @ApiOkResponse()
  public async resendEmailToken(@Body("email") email: string): Promise<void> {
    await this._authService.resendEmailToken(email);
  }

  @Post("check-confirm-token")
  @ApiOperation({summary: "resending a token to verify email"}) 
  @ApiOkResponse()
  public async checkConfirmEmailToken(@Body() dto: ConfirmEmailTokenDto): Promise<void> {
    await this._authService.checkConfirmEmailToken(dto);
  }

  @Post("refresh")
  @ApiOperation({summary: "checking the validity of the email verification token"}) 
  @ApiOkResponse({ type: JwtPairDto })
  async refreshManagerTokens(@Body() { refreshToken }: RefreshTokenDto): Promise<JwtPairDto> {
    return await this._authService.refreshTokens(refreshToken);
  }

  @Post("forgot-password")
  @ApiOperation({summary: "Send email with link to reset password"}) 
  @ApiOkResponse()
  async forgotPassword(@Body() { email }: ForgotPasswordDto): Promise<void> {
    return this._authService.forgotPassword(email);
  }

  @Post("reset-password")
  @ApiOperation({summary: "password reset using verification code"}) 
  @ApiOkResponse()
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    return this._authService.resetPassword(dto.code, dto.password);
  }
}
