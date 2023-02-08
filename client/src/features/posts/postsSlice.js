import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsAPI from './postsAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const response = await postsAPI.fetchPosts();
    return response;
  }
);

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
  entities: [],
  loading: 'idle',
  errors: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: function (state, action) {
      state.entities = action.payload ?? [];
      state.loading = 'succeeded';
      state.errors = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    })
    .addCase(fetchPostById.fulfilled, (state, action) => {
      state.entities = [action.payload];
      state.loading = 'succeeded';
      state.errors = [];
    })
    .addMatcher(
      (action) => action.type?.endsWith('Post/fulfilled'),
      (state) => {
      state.entities = [];
      state.loading = 'succeeded';
      state.errors = [];
    })
    
    builder.addMatcher(
      (action) => action.type?.endsWith('/rejected'),
      (state, action) => {
        state.errors = action.payload.errors;
        state.loading = 'failed';
      }
    );

    builder.addMatcher(
      (action) => action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;