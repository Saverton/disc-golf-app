import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null,
  notifications: null
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.notifications = action.payload['notifications?'];
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.notifications = null;
    }
  }
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;