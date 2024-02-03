import { Injectable } from "@nestjs/common";
import { Transporter } from "nodemailer";
import * as nodemailer from "nodemailer";

import { ProjectConfigService } from "src/infrastructure/config/config.service";

@Injectable()
export class EmailService {
  private from: string;
  private readonly transporter: Transporter;

  constructor(private readonly _configService: ProjectConfigService) {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: this._configService.noReplyEmail,
        pass: this._configService.noReplyEmailPassword,
      },
    });
    this.from = `Jnr by Neuralle <${this._configService.noReplyEmail}>`;
  }

  public async sendConfirmEmailLink(email: string, token: string): Promise<void> {
    const lowerEmail = email.toLowerCase();

    await this.transporter.sendMail({
      from: this.from,
      to: lowerEmail,
      subject: "Confirm email",
      text: `You can confirm your email by clicking this link ${this._configService.frontendUrl}/${this._configService.frontendConfirmEmailPageRoute}/${token}`,
    });
  }

  public async sendResetPasswordEmailLink(email: string, token: string): Promise<void> {
    const lowerEmail = email.toLowerCase();

    await this.transporter.sendMail({
      from: this.from,
      to: lowerEmail,
      subject: "Reset password email",
      text: `You can reset your password by clicking this link ${this._configService.frontendUrl}/${this._configService.frontendResetPasswordPageRoute}/${token}`,
    });
  }
}
