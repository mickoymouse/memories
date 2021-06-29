import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../api/Posts/index";

export const fetchAllPostsAsync = createAsyncThunk(
  "posts/fetchAll",
  async () => {
    try {
      const { data } = await api.fetchPosts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (post) => {
    try {
      console.log("POST: ", post);
      const { data } = await api.createPosts(post);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  fetching: false,
  error: "",
  posts: [],
};

export const postSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPostsAsync.pending]: (state) => {
      state.fetching = true;
      state.error = "";
    },
    [fetchAllPostsAsync.fulfilled]: (state, action) => {
      state.fetching = false;
      state.posts = action.payload;
      state.error = "";
    },
    [fetchAllPostsAsync.rejected]: (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
      state.posts = [];
    },

    [createPostAsync.pending]: (state) => {
      state.fetching = true;
      state.error = "";
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.fetching = false;
      state.posts = [...state.posts, action.payload];
      state.error = "";
    },
    [createPostAsync.rejected]: (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
