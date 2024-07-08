import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './categories/categorySlice';
import gigSlice from './gigs/gigSlice';
import userSlice from "./users/userSlice";

const store = configureStore({
  reducer: {
    categories: categorySlice,
    gigs: gigSlice,
    users: userSlice
  },
});

export default store;
