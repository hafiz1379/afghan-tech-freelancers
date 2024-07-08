import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getUser = createAsyncThunk('users/getUser', async (id) => {
  try {
    const res = await newRequest.get(`users/${id}`);
    const data = res.data;
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  users: [],
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          hasError: false,
          isLoading: false,
        };
      })
      .addCase(getUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(getUser.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      }),
});

export default userSlice.reducer;
