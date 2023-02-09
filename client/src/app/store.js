import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postsSlice';
import postManagerReducer from '../features/posts/postManagerSlice';
import coursesReducer from '../features/courses/coursesSlice';
import courseManagerReducer from '../features/courses/courseManagerSlice';
import otherUsersReducer from '../features/otherUsers/otherUsersSlice';
import profileUserReducer from '../features/otherUsers/profileUserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    postManager: postManagerReducer,
    courses: coursesReducer,
    courseManager: courseManagerReducer,
    otherUsers: otherUsersReducer,
    profileUser: profileUserReducer
  }
});