import { ArgsType, Field } from "@nestjs/graphql";
import { GroupWhereUniqueInput } from "./GroupWhereUniqueInput";
import { GroupUpdateInput } from "./GroupUpdateInput";

@ArgsType()
class UpdateGroupArgs {
  @Field(() => GroupWhereUniqueInput, { nullable: false })
  where!: GroupWhereUniqueInput;
  @Field(() => GroupUpdateInput, { nullable: false })
  data!: GroupUpdateInput;
}

export { UpdateGroupArgs };
