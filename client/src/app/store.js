import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postsSlice';
import postManagerSlice from '../features/posts/postManagerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    postManager: postManagerSlice
  }
});