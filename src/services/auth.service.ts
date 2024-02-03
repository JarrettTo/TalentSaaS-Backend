import { ResetPasswordTokenRepository } from "./../DAL/repositories/reset-password-token.repository";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { AuthDto } from "src/dto/auth/auth.dto";
import { ApiJWTService } from "src/services/jwt.service";
import { JwtPairDto } from "src/dto/auth/jwt-pair.dto";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { ConfirmEmailTokenEntity } from "src/DAL/entities/confirm-email.entity";
import { EmailService } from "src/services/email.service";
import { ConfirmEmailRepository } from "src/DAL/repositories/confirm-email-token.repository";
import { ConfirmEmailTokenDto } from "src/dto/auth/rconfirm-email-token.dto";
import { ResetPasswordTokenEntity } from "src/DAL/entities/reset-password.entity";

@Injectable()
export class AuthService {
  private _emailTokenTTL: number = 60000 * 60 * 24;
  constructor(
    private readonly _jwtService: ApiJWTService,
    private readonly _managerRepository: ManagerRepository,
    private readonly _confirmEmailTokenRepository: ConfirmEmailRepository,
    private readonly _resetPasswordTokenRepository: ResetPasswordTokenRepository,
    private readonly _emailService: EmailService,
  ) {}

  public async signIn(dto: AuthDto): Promise<JwtPairDto> {
    const { email, password } = dto;

    const manager = await this._managerRepository.getByEmail(email);

    if (manager == null) {
      throw new BadRequestException("Incorrect email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Incorrect email or password");
    }

    if (!manager.isVerified) {
      throw new BadRequestException("Email is not verified");
    }

    return await this._jwtService.generateTokensPair(manager);
  }

  public async signUp(dto: AuthDto): Promise<void> {
    const { email, password } = dto;
    const lowerEmail = email.toLowerCase();

    const manager = await this._managerRepository.getByEmail(lowerEmail);

    if (manager != null) {
      throw new BadRequestException("manager already exist!");
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newManager = new ManagerEntity();
    newManager.email = lowerEmail;
    newManager.password = passwordHash;
    await this._managerRepository.save(newManager);
    await this.generateEmailToken(newManager);
  }

  public async resendEmailToken(email: string): Promise<void> {
    const manager = await this._managerRepository.getByEmail(email);
    if (manager == null) {
      throw new BadRequestException(`manager with email ${email} not found!`);
    }
    await this.generateEmailToken(manager);

    const emailToken = await this._confirmEmailTokenRepository.getByManagerEmail(email);
    if (emailToken != null) {
      await this._confirmEmailTokenRepository.remove(emailToken);
    }
  }

  public async refreshTokens(refreshToken: string): Promise<JwtPairDto> {
    const token = await this._jwtService.getToken(refreshToken);
    if (token == null) {
      throw new BadRequestException("wrong refresh token");
    }

    const manager = await this._managerRepository.getById(token.managerId);
    await token.remove();

    return this._jwtService.generateTokensPair(manager);
  }

  public async checkConfirmEmailToken(dto: ConfirmEmailTokenDto): Promise<void> {
    const confirmEmailToken = await this._confirmEmailTokenRepository.getByToken(dto.token);
    if (confirmEmailToken == null) {
      throw new BadRequestException("bad token!");
    }

    if (confirmEmailToken.expirationDate < new Date()) {
      throw new BadRequestException("token has expired!");
    }

    confirmEmailToken.manager.isVerified = true;
    await this._managerRepository.save(confirmEmailToken.manager);
    await this._confirmEmailTokenRepository.remove(confirmEmailToken);
  }

  async forgotPassword(email: string): Promise<void> {
    email = email.toLocaleLowerCase();

    const manager = await this._managerRepository.getByEmail(email);
    if (manager == null) {
      throw new BadRequestException(`manager with email ${email} not found!`);
    }

    const token = await this.generateResetPasswordToken(manager);
  }

  async resetPassword(code: string, newPassword: string): Promise<void> {
    const token = await this._resetPasswordTokenRepository.getByToken(code);
    if (!token) {
      throw new BadRequestException("Unknown token");
    }

    const manager = await this._managerRepository.getById(token.manager.id);
    const passwordHash = bcrypt.hashSync(newPassword, 10);

    manager.password = passwordHash;
    await this._managerRepository.save(manager);
    await this._resetPasswordTokenRepository.remove(token);
  }

  private async generateEmailToken(manager: ManagerEntity): Promise<string> {
    const newConfirmEmailToken = new ConfirmEmailTokenEntity();
    newConfirmEmailToken.token = uuidV4();
    newConfirmEmailToken.expirationDate = new Date(Date.now() + this._emailTokenTTL);
    newConfirmEmailToken.manager = manager;
    await this._confirmEmailTokenRepository.save(newConfirmEmailToken);
    await this._emailService.sendConfirmEmailLink(manager.email, newConfirmEmailToken.token);

    return newConfirmEmailToken.token;
  }

  private async generateResetPasswordToken(manager: ManagerEntity): Promise<string> {
    const resetPasswordToken = new ResetPasswordTokenEntity();
    resetPasswordToken.token = uuidV4();
    resetPasswordToken.expirationDate = new Date(Date.now() + this._emailTokenTTL);
    resetPasswordToken.manager = manager;
    await this._resetPasswordTokenRepository.save(resetPasswordToken);
    await this._emailService.sendResetPasswordEmailLink(manager.email, resetPasswordToken.token);

    return resetPasswordToken.token;
  }
}
