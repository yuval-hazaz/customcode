import { PrismaService } from "nestjs-prisma";
import {
  FindOneGroupArgs,
  FindManyGroupArgs,
  GroupCreateArgs,
  GroupUpdateArgs,
  GroupDeleteArgs,
  Subset,
} from "@prisma/client";

export class GroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyGroupArgs>(args: Subset<T, FindManyGroupArgs>) {
    return this.prisma.group.findMany(args);
  }
  findOne<T extends FindOneGroupArgs>(args: Subset<T, FindOneGroupArgs>) {
    return this.prisma.group.findOne(args);
  }
  create<T extends GroupCreateArgs>(args: Subset<T, GroupCreateArgs>) {
    return this.prisma.group.create<T>(args);
  }
  update<T extends GroupUpdateArgs>(args: Subset<T, GroupUpdateArgs>) {
    return this.prisma.group.update<T>(args);
  }
  delete<T extends GroupDeleteArgs>(args: Subset<T, GroupDeleteArgs>) {
    return this.prisma.group.delete(args);
  }
}
