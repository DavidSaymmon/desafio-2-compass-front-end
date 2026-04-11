import type { IUser } from "./IUser";

export interface ILoginPayload {
  token: string;
  user: IUser;
}
