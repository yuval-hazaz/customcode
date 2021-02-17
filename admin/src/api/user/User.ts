import { GroupWhereUniqueInput } from "../group/GroupWhereUniqueInput";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

export type User = {
  createdAt: Date;
  firstName: string | null;
  group: GroupWhereUniqueInput | null;
  id: string;
  lastName: string | null;
  manager: UserWhereUniqueInput | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
