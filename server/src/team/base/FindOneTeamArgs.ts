import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereUniqueInput } from "./TeamWhereUniqueInput";

@ArgsType()
class FindOneTeamArgs {
  @Field(() => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
}

export { FindOneTeamArgs };
