import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getOrders = createAsyncThunk('Orders/getOrders', async () => {
  try {
    const res = await newRequest.get('orders');
    return res.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  orders: [],
  isLoading: false,
  hasError: false,
};

const orderSlice = createSlice({
  name: 'Orders',
  initialState,
  extraReducers: (builder) => builder.addCase,
});

export default orderSlice.reducer;
