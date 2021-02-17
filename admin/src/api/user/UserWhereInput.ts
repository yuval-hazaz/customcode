import { GroupWhereUniqueInput } from "../group/GroupWhereUniqueInput";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

export type UserWhereInput = {
  createdAt?: Date;
  firstName?: string | null;
  group?: GroupWhereUniqueInput | null;
  id?: string;
  lastName?: string | null;
  manager?: UserWhereUniqueInput | null;
  updatedAt?: Date;
  username?: string;
};
