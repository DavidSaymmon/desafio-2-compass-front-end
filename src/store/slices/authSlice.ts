import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "../../interfaces/IAuthState";
import type { ILoginPayload } from "../../interfaces/ILoginPayload";

const initialState: IAuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<ILoginPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
