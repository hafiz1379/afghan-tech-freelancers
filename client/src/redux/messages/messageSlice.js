import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getMessages = createAsyncThunk('messages/getMessages', async (conversationId) => {
  try {
    const res = await newRequest.get(`messages/${conversationId}`);
    return res.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  messages: [],
  oppositeUser: null,
  isLoading: false,
  hasError: false,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getMessages.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        return {
          ...state,
          messages: action.payload,
          isLoading: false,
          hasError: false,
        };
      })
      .addCase(getMessages.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      }),
});

export default messageSlice.reducer;
