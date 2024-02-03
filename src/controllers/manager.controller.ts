import { Get, Controller, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { CurrentManager } from "src/infrastructure/middlewares/guards/current-manager.decorator";
import { ShortManagerDto } from "src/dto/manager/manager-short.dto";
import { ManagerService } from "src/services/manager.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ManagerEntity } from "src/DAL/entities/manager.entity";

@Controller("manager")
@ApiTags("Manager")
@UseGuards(AuthGuard())
export class ManagerController {
  constructor(
    private readonly _service: ManagerService,

    @InjectMapper()
    private readonly _mapper: Mapper,
  ) {}

  @Get("current")
  @ApiOperation({summary: "get data about current manager"})
  @ApiOkResponse({ type: ShortManagerDto })
  public async findCurrentManager(@CurrentManager("id") id: number): Promise<ShortManagerDto> {
    const manager = await this._service.getOneOrFail(id);
    return this._mapper.map(manager, ManagerEntity, ShortManagerDto);
  }
}
