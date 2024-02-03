import { Mapper } from "@automapper/core";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import { ProjectConfigService } from "src/infrastructure/config/config.service";
import { InfluencerGroupRepository } from "src/DAL/repositories/influencer-group.repository";
import { InfluencerGroupEntity } from "src/DAL/entities/influencer-group.entity";
import { InfluencerGroupResponseDto } from "src/dto/influencer/group/influencer-group.response.dto";

@Injectable()
export class InfluencerGroupService {
  constructor(
    config: ProjectConfigService,

    private readonly _repository: InfluencerGroupRepository,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  public async findAll(): Promise<InfluencerGroupResponseDto[]> {
    const groups = await this._repository.getAll();

    return this._mapper.mapArray(groups, InfluencerGroupEntity, InfluencerGroupResponseDto);
  }

  public async findOneOrCreate(name: string): Promise<InfluencerGroupEntity> {
    const lowerName = name.toLowerCase();
    let group = await this._repository.getOneByName(lowerName);
    if (group == null) {
      group = new InfluencerGroupEntity();
      group.name = lowerName;
      await this._repository.save(group);
    }
    return group;
  }

  public async delete(id: number): Promise<void> {
    let group = await this._repository.getById(id);
    if (group == null) {
      throw new BadRequestException(`group with id ${id} not found!`);
    }
    await this._repository.remove(group);
  }
}
