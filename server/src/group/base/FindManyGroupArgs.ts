import { ArgsType, Field } from "@nestjs/graphql";
import { GroupWhereInput } from "./GroupWhereInput";

@ArgsType()
class FindManyGroupArgs {
  @Field(() => GroupWhereInput, { nullable: true })
  where?: GroupWhereInput;
}

export { FindManyGroupArgs };
