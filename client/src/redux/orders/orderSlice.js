import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => {
    const response = await newRequest.get('/orders');
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default orderSlice.reducer;
