import { PrismaService } from "nestjs-prisma";
import {
  FindOneTeamArgs,
  FindManyTeamArgs,
  TeamCreateArgs,
  TeamUpdateArgs,
  TeamDeleteArgs,
  Subset,
} from "@prisma/client";

export class TeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyTeamArgs>(args: Subset<T, FindManyTeamArgs>) {
    return this.prisma.team.findMany(args);
  }
  findOne<T extends FindOneTeamArgs>(args: Subset<T, FindOneTeamArgs>) {
    return this.prisma.team.findOne(args);
  }
  create<T extends TeamCreateArgs>(args: Subset<T, TeamCreateArgs>) {
    return this.prisma.team.create<T>(args);
  }
  update<T extends TeamUpdateArgs>(args: Subset<T, TeamUpdateArgs>) {
    return this.prisma.team.update<T>(args);
  }
  delete<T extends TeamDeleteArgs>(args: Subset<T, TeamDeleteArgs>) {
    return this.prisma.team.delete(args);
  }
}
