import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchComments = createAsyncThunk('/comments/getComments', async (id) => {
    const { data } = await axios.get(`/comments/${id}/getCommentsByPost`)
    return data;
})

export const createComment = createAsyncThunk('/comments/createComment', async (id, params) => {
    const { data } = await axios.post(`/comments/${id}/createComment`, { params })
    return data;
})

export const fetchAmountComments = createAsyncThunk('/comments/getAmoynt', async (id) => {
    const { data } = await axios.get(`/comments/${id}/getAmount`);
    return data;
})

const initialState = {
    comments: {
        items: [],
        amountById: 0,
        isLoading: 'loading',
        isSendItem: 'none'
    }
}


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.comments.isLoading = 'loading'
                state.comments.items = []
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments.isLoading = 'loaded'
                state.comments.items = action.payload
            })
            .addCase(fetchComments.rejected, (state) => {
                state.comments.isLoading = 'error'
            })
            .addCase(createComment.pending, (state) => {
                state.comments.isLoading = 'loading'
                state.comments.isSendItem = 'none'
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.isLoading = 'loaded'
                state.comments.isSendItem = 'send'
            })
            .addCase(createComment.rejected, (state) => {
                state.comments.isLoading = 'error'
                state.comments.isSendItem = 'error'
            })
            .addCase(fetchAmountComments.pending, (state) => {
                state.comments.isLoading = 'loading'
                state.comments.amountById = 0
            })
            .addCase(fetchAmountComments.fulfilled, (state, action) => {
                state.comments.isLoading = 'loaded'
                state.comments.amountById = action.payload.amount;
            })
            .addCase(fetchAmountComments.rejected, (state) => {
                state.comments.isLoading = 'error'
            })
            
    }
})

export const CommentReducer = commentsSlice.reducer;
export const selectIsSend = (state) => Boolean(state.comments.comments.isSendItem === 'send');