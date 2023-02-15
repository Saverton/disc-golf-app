import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import otherUsersAPI from "../../fetchAPIs/otherUsersAPI";

export const fetchOtherUserById = createAsyncThunk(
  'profileUser/fetchOtherUserById',
  async (args, thunkAPI) => {
    const response = await otherUsersAPI.fetchOtherUserById(args.id);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const createFriendship = createAsyncThunk(
  'profileUser/createFriendship',
  async (args, thunkAPI) => {
    const response = await otherUsersAPI.fetchCreateFriendship(args.userId, args.friendId);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const deleteFriendship = createAsyncThunk(
  'profileUser/deleteFriendship',
  async (args, thunkAPI) => {
    otherUsersAPI.fetchDeleteFriendship(args.friendshipId);
    return thunkAPI.fulfillWithValue(null);
  }
)

const initialState = {
  entity: {},
  loading: 'idle',
  errors: []
};

const profileUserSlice = createSlice({
  name: 'profileUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOtherUserById.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    }).addCase(createFriendship.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    }).addCase(deleteFriendship.fulfilled, (state) => {
      state.entity.friendship = {
        id: null,
        status: false
      };
      state.loading = 'succeeded';
    });

    builder.addMatcher(
      (action) => action.type?.includes('profileUser') && action.type.endsWith('/rejected'),
      (state, action) => {
        state.entity = {};
        state.loading = 'failed';
        state.errors = action.payload; 
      }
    )

    builder.addMatcher(
      (action) => action.type?.includes('profileUser') && action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export default profileUserSlice.reducer;