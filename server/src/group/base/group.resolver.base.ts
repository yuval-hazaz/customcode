import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateGroupArgs } from "./CreateGroupArgs";
import { UpdateGroupArgs } from "./UpdateGroupArgs";
import { DeleteGroupArgs } from "./DeleteGroupArgs";
import { FindManyGroupArgs } from "./FindManyGroupArgs";
import { FindOneGroupArgs } from "./FindOneGroupArgs";
import { Group } from "./Group";
import { FindManyUserArgs } from "../../user/base/FindManyUserArgs";
import { User } from "../../user/base/User";
import { GroupService } from "../group.service";

@graphql.Resolver(() => Group)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GroupResolverBase {
  constructor(
    protected readonly service: GroupService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Group])
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "any",
  })
  async groups(
    @graphql.Args() args: FindManyGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Group[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Group",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Group, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "own",
  })
  async group(
    @graphql.Args() args: FindOneGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Group | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Group",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Group)
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "create",
    possession: "any",
  })
  async createGroup(
    @graphql.Args() args: CreateGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Group> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Group"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Group)
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "update",
    possession: "any",
  })
  async updateGroup(
    @graphql.Args() args: UpdateGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Group | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Group"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Group)
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "delete",
    possession: "any",
  })
  async deleteGroup(
    @graphql.Args() args: DeleteGroupArgs
  ): Promise<Group | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [User])
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "any",
  })
  async users(
    @graphql.Parent() parent: Group,
    @graphql.Args() args: FindManyUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .users(args);
    return results.map((result) => permission.filter(result));
  }
}
