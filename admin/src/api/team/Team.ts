import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Team = {
  createdAt: Date;
  id: string;
  updatedAt: Date;
  users: UserWhereUniqueInput | null;
};
