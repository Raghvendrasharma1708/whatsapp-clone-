import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from '../features/chats/chatSlice.js';

export const store = configureStore({
    reducer: {
        chats: chatsReducer
    }
});