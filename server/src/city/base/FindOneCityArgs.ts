import { ArgsType, Field } from "@nestjs/graphql";
import { CityWhereUniqueInput } from "./CityWhereUniqueInput";

@ArgsType()
class FindOneCityArgs {
  @Field(() => CityWhereUniqueInput, { nullable: false })
  where!: CityWhereUniqueInput;
}

export { FindOneCityArgs };
