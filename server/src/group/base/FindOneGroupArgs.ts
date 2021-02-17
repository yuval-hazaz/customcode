import { ArgsType, Field } from "@nestjs/graphql";
import { GroupWhereUniqueInput } from "./GroupWhereUniqueInput";

@ArgsType()
class FindOneGroupArgs {
  @Field(() => GroupWhereUniqueInput, { nullable: false })
  where!: GroupWhereUniqueInput;
}

export { FindOneGroupArgs };
