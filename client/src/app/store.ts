// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { loadAuthState, saveAuthState } from "../services/localStorage";
import rootReducer from "./rootReducer";

/**
 * Preload authentication state from localStorage.
 * This ensures the app starts with the user's session data if available.
 */
const preloadedState: Partial<RootState> = {
  auth: loadAuthState(),
};

/**
 * Create the Redux store with a root reducer, preloaded state, and middleware.
 */
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Enables support for thunk middleware
      serializableCheck: false, // Disables checks for non-serializable data
      immutableCheck: true, // Disables checks for state immutability
    }),

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});


 // Subscribe to store updates to save the `auth` state in localStorage or sessionStorage.

store.subscribe(() => {
  const authState = store.getState().auth;

  // Persist auth state in sessionStorage
  sessionStorage.setItem("auth", JSON.stringify(authState));

  // Persist auth state in localStorage if "keepMeSignedIn" is enabled
  if (
    authState.isLoggedIn &&
    localStorage.getItem("keepMeSignedIn") === "true"
  ) {
    saveAuthState(authState);
  } else {
    localStorage.removeItem("auth");
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

export default store;
