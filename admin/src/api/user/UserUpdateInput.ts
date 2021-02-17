import { GroupWhereUniqueInput } from "../group/GroupWhereUniqueInput";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

export type UserUpdateInput = {
  firstName?: string | null;
  group?: GroupWhereUniqueInput | null;
  lastName?: string | null;
  manager?: UserWhereUniqueInput | null;
  password?: string;
  roles?: Array<string>;
  username?: string;
};
