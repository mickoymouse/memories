import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../api/Posts/index';

export const fetchAllPostsAsync = createAsyncThunk(
  'posts/fetchAll',
  async () => {
      try {
        const { data } = await api.fetchPosts();
        return data;
      } catch (error) {
        return error.message;
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
            console.log(action)
            state.fetching = false;
            state.error = action.payload;
            state.posts = [];
        }
    }
    
    // (builder) => {
    //     builder
    //         .addCase(fetchAllPostsAsync.pending, (state) => {
    //             state.fetching = true;
    //         })
    //         .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
    //             state.fetching = false;
    //             state.posts = action.payload
    //         }) 
    // }
});

export default postSlice.reducer;