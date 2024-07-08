import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getGigs = createAsyncThunk('gigs/getGigs', async (query) => {
  try {
    const res = await newRequest.get(`gigs${query}`);
    const data = res.data;
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  gigs: [],
  isLoading: false,
  hasError: false,
};

const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getGigs.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(getGigs.fulfilled, (state, action) => {
        return {
          ...state,
          gigs: action.payload,
          isLoading: false,
          hasError: false,
        };
      })
      .addCase(getGigs.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      }),
});

export default gigSlice.reducer;
