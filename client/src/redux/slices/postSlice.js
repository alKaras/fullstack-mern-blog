import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts/getPosts');
    return data;
});

export const fetchRemovedPost = createAsyncThunk('posts/fetchRemovedPost', async (id) => {
    const { data } = await axios.delete(`/posts/removePost/${id}`);
    return data;
})

export const fetchByTags = createAsyncThunk('posts/search', async (params) => {
    const { data } = await axios.get(`/posts/search?values=${params}`);
    return data;
})

const initialState = {
    posts: {
        items: [],
        tags: null,
        deletingStatus: 'process',
        isloading: 'loading',
    }
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload;
                state.posts.isloading = 'loaded'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.posts.items = []
                state.posts.isloading = 'error'
            })
            .addCase(fetchRemovedPost.pending, (state) => {
                state.posts.deletingStatus = 'process'
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(fetchRemovedPost.fulfilled, (state, action) => {
                state.posts.deletingStatus = 'done'
                state.isLoading = 'loaded'
                state.error = null
            })
            .addCase(fetchRemovedPost.rejected, (state, action) => {
                state.isLoading = 'loading'
                state.posts.deletingStatus = 'error'
                state.error = action.payload.message
            })
            .addCase(fetchByTags.pending, (state) => {
                state.searchStatus = 'loading'
                state.posts.items = []
                state.error = null
            })
            .addCase(fetchByTags.fulfilled, (state, action) => {
                state.searchStatus = 'loaded'
                state.error = null
                state.posts.items = action.payload;
            })
            .addCase(fetchByTags.rejected, (state, action) => {
                state.searchStatus = 'loading'
                state.posts.items = []
                state.error = action.payload.message
            })
    }
})



export const PostReducer = postSlice.reducer;
export const infoAboutDeleted = (state) => (state.posts.deletedPost);