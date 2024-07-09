import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getReviews = createAsyncThunk('reviews/getReviews', async (gigId) => {
  try {
    const res = await newRequest.get(`reviews/${gigId}`);
    return res.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  reviews: [],
  isLoading: false,
  hasError: false,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getReviews.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        return {
          ...state,
          reviews: action.payload,
          hasError: false,
          isLoading: false,
        };
      })
      .addCase(getReviews.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      }),
});

export default reviewSlice.reducer;
