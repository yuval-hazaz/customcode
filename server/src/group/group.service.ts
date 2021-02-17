import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { GroupServiceBase } from "./base/group.service.base";

@Injectable()
export class GroupService extends GroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
