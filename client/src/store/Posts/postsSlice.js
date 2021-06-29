import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../api/Posts/index';

export const fetchAllPostsAsync = createAsyncThunk(
  'posts/fetchAll',
  async () => {
      try {
        const { data } = await api.fetchPosts();
        return data;
      } catch (error) {
        throw(error);
      }
  }
);

const initialState = {
    fetching: false,
    error: '',
    posts: []
};

export const postSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        fetchAllPosts: (state, action) => {
            state.posts = action.payload
        }
    },
    extraReducers: {
        [fetchAllPostsAsync.pending] : (state) => {
            state.fetching = true;
            state.error = '';
        },
        [fetchAllPostsAsync.fulfilled] : (state, action) => {
            state.fetching = false;
            state.posts = action.payload;
            state.error = '';
        },
        [fetchAllPostsAsync.rejected] : (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
            state.posts = [];
        }
    }
});

export default postSlice.reducer;