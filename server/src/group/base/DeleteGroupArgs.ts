import { ArgsType, Field } from "@nestjs/graphql";
import { GroupWhereUniqueInput } from "./GroupWhereUniqueInput";

@ArgsType()
class DeleteGroupArgs {
  @Field(() => GroupWhereUniqueInput, { nullable: false })
  where!: GroupWhereUniqueInput;
}

export { DeleteGroupArgs };
