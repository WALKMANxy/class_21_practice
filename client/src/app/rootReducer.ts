// src/app/rootReducer.ts
import { Action, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import searchReducer from '../store/search/searchSlice';

// Add additional reducers here as needed
const appReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,

});

/**
 * Root reducer to handle global actions such as resetting the state.
 */
const rootReducer = (
  state: Partial<ReturnType<typeof appReducer>> | undefined,
  action: Action
) => {
  if (action.type === "auth/handleLogout/fulfilled") {
    // Reset state to undefined on logout
    state = undefined;
  }

  return appReducer(state as ReturnType<typeof appReducer>, action);
};

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
