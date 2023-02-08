import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsAPI from './postsAPI';

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (args, thunkAPI) => {
    const response = await postsAPI.fetchCreatePost(args.userId, args.postData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (args, thunkAPI) => {
    const response = await postsAPI.fetchPostById(args.userId, args.postId);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (args, thunkAPI) => {
    const response = await postsAPI.fetchEditPost(args.userId, args.postId, args.postData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (args, thunkAPI) => {
    const response = await postsAPI.fetchDeletePost(args.userId, args.postId);
    if (response?.errors)
      return thunkAPI.rejectWithValue(response);
    return thunkAPI.fulfillWithValue(null);
  }
);

const initialState = {
  entity: {},
  loading: 'idle',
  errors: []
}

const postManagerSlice = createSlice({
  name: 'postManager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    })
    
    builder.addMatcher(
      (action) => action.type?.endsWith('/rejected'),
      (state, action) => {
        state.errors = action.payload.errors;
        state.loading = 'failed';
      }
    )
    .addMatcher(
      (action) => action.type?.endsWith('Post/fulfilled'),
      (state) => {
        state.entities = {};
        state.loading = 'succeeded';
        state.errors = [];
      }
    )
    .addMatcher(
      (action) => action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export const { setPosts } = postManagerSlice.actions;

export default postManagerSlice.reducer;