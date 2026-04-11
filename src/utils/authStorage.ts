import type { IUser } from "../interfaces/IUser";

const AUTH_STORAGE_KEY = "auth";

export function saveAuthSession(user: IUser, token: string) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user,
    }),
  );
}
