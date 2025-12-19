import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import messageReducer from '../features/messages/messageSlice'

export const store = configureStore( {
    reducer: {
        daak: postReducer,
        auth: userReducer,
        chats: messageReducer
    }
} )