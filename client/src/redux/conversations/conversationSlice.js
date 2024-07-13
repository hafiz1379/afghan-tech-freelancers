import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newRequest from '../../utils/newRequest';

export const getConversations = createAsyncThunk('conversations/getConversations', async () => {
  try {
    const res = await newRequest.get('conversations');
    return res.data; // Make sure this is an array
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return []; // Return an empty array in case of an error
  }
});


const initialState = {
  conversations: [],
  hasError: false,
  isLoading: false,
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getConversations.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        return {
          ...state,
          conversations: action.payload,
          hasError: false,
          isLoading: false,
        };
      })
      .addCase(getConversations.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          isLoading: false,
        };
      }),
});



export default conversationSlice.reducer;