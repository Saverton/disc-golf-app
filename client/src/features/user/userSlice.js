import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
    }
  }
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;