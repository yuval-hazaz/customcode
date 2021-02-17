import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { GroupResolver } from "./group.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
