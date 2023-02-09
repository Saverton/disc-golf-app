import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesAPI from './coursesAPI';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (name, thunkAPI) => {
    const response = await coursesAPI.fetchCourses(name);
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

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    });

    builder.addMatcher(
      (action) => action.type?.includes('courses') && action.type?.endsWith('/rejected'),
      (state, action) => {
        state.entities = [];
        state.loading = 'failed';
        state.errors = action.payload.errors;
      }
    );

    builder.addMatcher(
      (action) => action.type?.includes('courses') && action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export default coursesSlice.reducer;