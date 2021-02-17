import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeamUpdateInput = {
  users?: UserWhereUniqueInput | null;
};
