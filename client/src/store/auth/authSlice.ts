import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleLogin, handleLogout } from "./authThunks";
import { toast } from "sonner";

export interface AuthState {
  isLoggedIn: boolean;
  id: string;
  email: string;
  username: string;
  name: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  id: "",
  email: "",
  username: "",
  name: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInfo: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        username: string;
        name: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.id = "";
        state.email = "";
        state.username = "";
        state.name = "";
        state.refreshToken = "";
      })
      .addCase(handleLogin.rejected, (_state, action) => {
        toast.error("Failed to login: " + action.payload);
        console.error(action.payload);
      })
      .addCase(handleLogout.rejected, (_state, action) => {
        console.error(action.payload);
      });
  },
});

export const { updateUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const selectIsLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectId = (state: { auth: AuthState }) => state.auth.id;
export const selectEmail = (state: { auth: AuthState }) => state.auth.email;
export const selectUsername = (state: { auth: AuthState }) => state.auth.username;
export const selectName = (state: { auth: AuthState }) => state.auth.name;
