import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAllPostsAsync = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    return ['post1', 'post2'];
  }
);

const initialState = {
    status: 'idle',
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPostsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.posts = action.payload
            })
    }
});

export default postSlice;