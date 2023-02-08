import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsAPI from './postsAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const response = await postsAPI.fetchPosts();
    return response;
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
    });

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