import { ArgsType, Field } from "@nestjs/graphql";
import { TeamWhereInput } from "./TeamWhereInput";

@ArgsType()
class FindManyTeamArgs {
  @Field(() => TeamWhereInput, { nullable: true })
  where?: TeamWhereInput;
}

export { FindManyTeamArgs };
