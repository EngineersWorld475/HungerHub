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
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.existingUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.existingUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signinFailure,
  signinStart,
  signinSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} = hungUserSlice.actions;

export default hungUserSlice.reducer;
