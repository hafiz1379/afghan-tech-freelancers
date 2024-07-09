import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './categories/categorySlice';
import gigSlice from './gigs/gigSlice';
import userSlice from './users/userSlice';
import reviewSlice from './reviews/reviewSlice';
import messageSlice from './messages/messageSlice';
import conversationSlice from './conversations/conversationSlice';
import orderSlice from './orders/orderSlice';

const store = configureStore({
  reducer: {
    categories: categorySlice,
    gigs: gigSlice,
    user: userSlice,
    reviews: reviewSlice,
    messages: messageSlice,
    conversations: conversationSlice,
    orders: orderSlice,
  },
});

export default store;
