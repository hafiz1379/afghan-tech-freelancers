import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './categories/categorySlice';
const store = configureStore({
  reducer: {
    categories: categorySlice,
  },
});

export default store;
