import { ArgsType, Field } from "@nestjs/graphql";
import { CityWhereUniqueInput } from "./CityWhereUniqueInput";

@ArgsType()
class DeleteCityArgs {
  @Field(() => CityWhereUniqueInput, { nullable: false })
  where!: CityWhereUniqueInput;
}

export { DeleteCityArgs };
