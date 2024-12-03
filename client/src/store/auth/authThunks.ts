import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAccessToken } from "../../services/tokenService";
import { logoutUser } from "./api/auth";

// Thunk to handle login
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (
    {
      id,
      email,
      username,
      name,
      refreshToken,
    }: {
      id: string;
      email: string;
      username: string;
      name: string;
      refreshToken: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Save auth state locally
      sessionStorage.setItem(
        "authState",
        JSON.stringify({
          isLoggedIn: true,
          id,
          email,
          username,
          name,
          refreshToken,
        })
      );

      setAccessToken(refreshToken); // Save token for API usage

      return { id, email, username, name, refreshToken };
    } catch (error: unknown) {
      const typedError = error as { message: string };
      return rejectWithValue(typedError.message);
    }
  }
);

// Thunk to handle logout
export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser(); // Call the server's logout endpoint

      sessionStorage.removeItem("authState");
      localStorage.removeItem("authState");
      setAccessToken(null); // Clear token
      window.location.href = "/";
    } catch (error: unknown) {
      const typedError = error as { message: string };
      sessionStorage.removeItem("authState");
      localStorage.removeItem("authState");
      setAccessToken(null); // Clear token
      window.location.href = "/";
      return rejectWithValue(typedError.message);
    }
  }
);
