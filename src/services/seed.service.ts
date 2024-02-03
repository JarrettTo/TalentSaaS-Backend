import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { Injectable } from "@nestjs/common";

import { LoggerService } from "@unistory/nestjs-logger";
import * as bcrypt from "bcrypt";
import { ManagerRepository } from "../DAL/repositories/manager.repository";
import { ProjectConfigService } from "src/infrastructure/config/config.service";

@Injectable()
export class SeedService {
  constructor(
    private readonly _logger: LoggerService,
    private readonly _managerRepository: ManagerRepository,
    private readonly _configService: ProjectConfigService,
  ) {}

  public async run(): Promise<void> {
    await this.setAdmin();
  }

  private async setAdmin(): Promise<void> {
    const managers = await this._managerRepository.getAll();
    if (managers.length != 0) {
      return;
    }
    const newManager = new ManagerEntity();
    newManager.email = this._configService.testEmail;
    newManager.isVerified = true;
    newManager.password = bcrypt.hashSync(this._configService.testPassword, 10);

    await this._managerRepository.save(newManager);
  }
}
