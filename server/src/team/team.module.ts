import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { TeamResolver } from "./team.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamResolver],
  exports: [TeamService],
})
export class TeamModule {}
