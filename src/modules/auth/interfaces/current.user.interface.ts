import { UserRoles } from "src/enums/roles.enum";

export interface CurrentUser {
  userId: string;
  username: string;
  email: string;
  role: UserRoles;
}
