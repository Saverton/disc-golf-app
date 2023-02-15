import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchSignup, fetchMe } from '../../fetchAPIs/userAPI';

export const login = createAsyncThunk(
  'user/login',
  async (loginData, thunkAPI) => {
    const response = await fetchLogin(loginData);
    if (response.status === 'unauthorized')
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    fetchLogout();
    return thunkAPI.fulfillWithValue(null);
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (signupData, thunkAPI) => {
    const response = await fetchSignup(signupData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const resumeSession = createAsyncThunk(
  'user/me',
  async (_, thunkAPI) => {
    return await fetchMe();
  }
);

function createUserSession(state, action) {
  state.id = action.payload.id;
  state.username = action.payload.username;
  state.notifications = action.payload['notifications?'];
  state.loading = 'succeeded';
  state.errors = [];
}

const initialState = {
  id: null,
  username: null,
  notifications: null,
  loading: 'idle',
  errors: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.errors = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, createUserSession)
    .addCase(signup.fulfilled, createUserSession)
    .addCase(resumeSession.fulfilled, createUserSession)
    .addCase(logout.fulfilled, (state) => {
      state.id = null;
      state.username = null;
      state.notifications = null;
      state.loading = 'succeeded';
    });

    builder.addMatcher(
      (action) => action.type?.startsWith('user') && action.type?.endsWith('/rejected'),
      (state, action) => {
        state.errors = action.payload.errors;
        state.loading = 'failed';
      }
    );

    builder.addMatcher(
      (action) => action.type?.startsWith('user') && action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;