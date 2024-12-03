// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // Add your reducers here when they are ready
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

// Export the store as default
export default store;
