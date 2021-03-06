import { CityWhereUniqueInput } from "../city/CityWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Team = {
  city: CityWhereUniqueInput | null;
  createdAt: Date;
  id: string;
  symbol: string | null;
  updatedAt: Date;
  users: UserWhereUniqueInput | null;
};
