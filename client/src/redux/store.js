import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { PostReducer } from './slices/postSlice';

export const store = configureStore({
    reducer: {
        logreg: authReducer,
        posts: PostReducer,
    }
})