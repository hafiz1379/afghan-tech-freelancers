import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  try {
    const res = await newRequest.get('categories');
    const data = res.data.data.categories;
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  categories: [],
  isLoading: false,
  hasError: false,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        return {
          ...state,
          categories: action.payload,
          isLoading: false,
          hasError: false,
        };
      })
      .addCase(getCategories.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      });
  },
});

export default categorySlice.reducer;
