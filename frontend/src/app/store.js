import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore( {
    reducer: {
        daak: postReducer,
        auth: userReducer
    }
} )