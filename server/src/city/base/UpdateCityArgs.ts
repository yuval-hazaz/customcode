import { ArgsType, Field } from "@nestjs/graphql";
import { CityWhereUniqueInput } from "./CityWhereUniqueInput";
import { CityUpdateInput } from "./CityUpdateInput";

@ArgsType()
class UpdateCityArgs {
  @Field(() => CityWhereUniqueInput, { nullable: false })
  where!: CityWhereUniqueInput;
  @Field(() => CityUpdateInput, { nullable: false })
  data!: CityUpdateInput;
}

export { UpdateCityArgs };
