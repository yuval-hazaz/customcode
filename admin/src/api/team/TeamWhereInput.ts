import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeamWhereInput = {
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
  users?: UserWhereUniqueInput | null;
};
