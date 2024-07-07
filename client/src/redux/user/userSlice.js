import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  existingUser: null,
  loading: false,
  error: null,
};

export const hungUserSlice = createSlice({
  name: 'hunguser',
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.existingUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinFailure, signinStart, signinSuccess } =
  hungUserSlice.actions;

export default hungUserSlice.reducer;
