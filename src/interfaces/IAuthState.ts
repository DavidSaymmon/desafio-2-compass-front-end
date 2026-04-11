import type { IUser } from "./IUser";

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}
