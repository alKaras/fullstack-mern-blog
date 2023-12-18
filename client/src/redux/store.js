import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { PostReducer } from './slices/postSlice';
import { CommentReducer } from './slices/commentSlice';

export const store = configureStore({
    reducer: {
        logreg: authReducer,
        posts: PostReducer,
        comments: CommentReducer,
    }
})