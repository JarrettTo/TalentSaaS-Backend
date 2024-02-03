import { Mapper } from "@automapper/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { ManagerRepository } from "src/DAL/repositories/manager.repository";
import { ManagerEntity } from "src/DAL/entities/manager.entity";
import { UniHttpException } from "@unistory/nestjs-common";

@Injectable()
export class ManagerService {
  constructor(
    config: ProjectConfigService,

    private readonly _repository: ManagerRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  public async getOneOrCreate(email: string): Promise<ManagerEntity> {
    let manager = await this._repository.getByEmail(email);
    if (manager != null) {
      return manager;
    }
    manager = new ManagerEntity();
    manager.email = email;

    return await this._repository.save(manager);
  }
  public async getOneOrFail(id: number): Promise<ManagerEntity> {
    const manager = await this._repository.getById(id);
    if (manager == null) {
      throw new UniHttpException(`manager with id=${id} not found`);
    }
    return manager;
  }
}
