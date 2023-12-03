import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts/getPosts');
    return data;
});

const initialState = {
    posts: {
        items: [],
        isloading: 'loading',
    },
    tags: {
        items: [],
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
    }
})



export const PostReducer = postSlice.reducer;