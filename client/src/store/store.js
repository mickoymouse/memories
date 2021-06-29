import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import postsReducer from './Posts/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    Posts: postsReducer,
  },
});