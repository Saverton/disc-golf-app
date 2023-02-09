import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import otherUsersAPI from './otherUsersAPI';

export const fetchOtherUsersByName = createAsyncThunk(
  'otherUsers/fetchOtherUsersByName',
  async (args, thunkAPI) => {
    const response = await otherUsersAPI.fetchOtherUsersByName(args.username);
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

const otherUsersSlice = createSlice({
  name: 'otherUsers',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOtherUsersByName.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    }).addCase(fetchOtherUsersByName.rejected, (state, action) => {
      state.entities = [];
      state.loading = 'failed';
      state.errors = action.payload;
    });

    builder.addMatcher(
      (action) => action.type?.includes('otherUsers') && action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export const { setUsers } = otherUsersSlice.actions;

export default otherUsersSlice.reducer;