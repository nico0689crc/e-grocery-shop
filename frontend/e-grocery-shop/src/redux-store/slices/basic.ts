// Third-party Imports
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  count: number;
};

const initialState: InitialState = {
  count: 0,
};

export const basicSlice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    increment: (state, action) => {},
  },
});

export const { increment } = basicSlice.actions;

export default basicSlice.reducer;
