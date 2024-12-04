// src/store/searchSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  category: string; 
}

const initialState: SearchState = {
  query: '',
  category: '', 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) { 
      state.category = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory } = searchSlice.actions; 

export default searchSlice.reducer;
