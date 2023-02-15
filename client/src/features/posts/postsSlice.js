import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsAPI from '../../fetchAPIs/postsAPI';
import commentsAPI from '../../fetchAPIs/commentsAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const response = await postsAPI.fetchPosts();
    return response;
  }
);

export const loadMorePosts = createAsyncThunk(
  'posts/loadMorePosts',
  async (_, thunkAPI) => {
    const length = thunkAPI.getState().posts.entities.length;
    if (length % 10 !== 0)
      return thunkAPI.rejectWithValue({ errors: ['No more posts'] });

    const response = await postsAPI.fetchPosts(length);
    return response;
  }
)

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (args, thunkAPI) => {
    const response = await commentsAPI.fetchAddComment(args.userId, args.commentData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const removeComment = createAsyncThunk(
  'posts/removeComment',
  async (args, thunkAPI) => {
    const response = await commentsAPI.fetchDeleteComment(args.userId, args.commentId);
    if (response?.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const editComment = createAsyncThunk(
  'posts/editComment',
  async (args, thunkAPI) => {
    const response = await commentsAPI.fetchEditComment(args.userId, args.commentId, args.commentData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const initialState = {
  entities: [],
  loading: 'idle',
  errors: []
};

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

    builder.addCase(loadMorePosts.fulfilled, (state, action) => {
      state.entities.push(...action.payload);
      state.loading = 'succeeded';
      state.errors = []; 
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const post = state.entities.find(p => p.id === action.payload['post_id']);
      post.comments.push(action.payload);
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      const post = state.entities.find(p => p.id === action.payload['post_id']);
      post.comments = post.comments.filter(c => c.id !== action.payload.id);
    });

    builder.addCase(editComment.fulfilled, (state, action) => {
      const post = state.entities.find(p => p.id === action.payload['post_id']);
      post.comments = post.comments.map(c => {
        if (c.id === action.payload.id)
          return action.payload;
        else
          return c;
      });
    });

    builder.addMatcher(
      (action) => action.type?.endsWith('/rejected'),
      (state, action) => {
        state.errors = action.payload?.errors;
        state.loading = 'failed';
      }
    );

    builder.addMatcher(
      (action) => action.type?.endsWith('fetchPosts/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;