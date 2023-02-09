import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesAPI from './coursesAPI';

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (args, thunkAPI) => {
    const response = await coursesAPI.fetchPostCourse(args.courseData);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (args, thunkAPI) => {
    const response = await coursesAPI.fetchCourseById(args.courseId);
    if (response.errors)
      return thunkAPI.rejectWithValue(response);
    return response;
  }
);

const initialState = {
  entity: {},
  loading: 'idle',
  errors: []
};

const courseManagerSlice = createSlice({
  name: 'courseManager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = 'succeeded';
      state.errors = [];
    });

    builder.addMatcher(
      (action) => action.type?.startsWith('courseManager') && action.type?.endsWith('/rejected'),
      (state, action) => {
        state.entities = [];
        state.loading = 'failed';
        state.errors = action.payload.errors;
      }
    );

    builder.addMatcher(
      (action) => action.type?.startsWith('courseManager') && action.type?.endsWith('/pending'),
      (state) => {
        state.loading = 'pending';
      }
    );
  }
});

export default courseManagerSlice.reducer;