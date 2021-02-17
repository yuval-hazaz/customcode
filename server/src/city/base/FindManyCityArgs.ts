import { ArgsType, Field } from "@nestjs/graphql";
import { CityWhereInput } from "./CityWhereInput";

@ArgsType()
class FindManyCityArgs {
  @Field(() => CityWhereInput, { nullable: true })
  where?: CityWhereInput;
}

export { FindManyCityArgs };
