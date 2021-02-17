import { CityWhereUniqueInput } from "./CityWhereUniqueInput";
import { CityUpdateInput } from "./CityUpdateInput";

export type UpdateCityArgs = {
  where: CityWhereUniqueInput;
  data: CityUpdateInput;
};
