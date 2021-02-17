import { CityWhereUniqueInput } from "../city/CityWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeamUpdateInput = {
  city?: CityWhereUniqueInput | null;
  symbol?: string | null;
  users?: UserWhereUniqueInput | null;
};
