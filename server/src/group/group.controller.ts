import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GroupService } from "./group.service";
import { GroupControllerBase } from "./base/group.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("groups")
@common.Controller("groups")
export class GroupController extends GroupControllerBase {
  constructor(
    protected readonly service: GroupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
