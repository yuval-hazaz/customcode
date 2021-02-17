import { CityWhereUniqueInput } from "../city/CityWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeamCreateInput = {
  city?: CityWhereUniqueInput | null;
  users?: UserWhereUniqueInput | null;
};
