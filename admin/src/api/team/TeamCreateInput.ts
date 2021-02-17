import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeamCreateInput = {
  users?: UserWhereUniqueInput | null;
};
