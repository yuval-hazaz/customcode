import { ArgsType, Field } from "@nestjs/graphql";
import { CityCreateInput } from "./CityCreateInput";

@ArgsType()
class CreateCityArgs {
  @Field(() => CityCreateInput, { nullable: false })
  data!: CityCreateInput;
}

export { CreateCityArgs };
