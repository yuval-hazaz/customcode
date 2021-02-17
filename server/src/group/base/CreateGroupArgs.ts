import { ArgsType, Field } from "@nestjs/graphql";
import { GroupCreateInput } from "./GroupCreateInput";

@ArgsType()
class CreateGroupArgs {
  @Field(() => GroupCreateInput, { nullable: false })
  data!: GroupCreateInput;
}

export { CreateGroupArgs };
