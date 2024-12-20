import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        selectedChatIds: []
    },
    reducers: {
        selectChat: (state, action) => {
            state.selectedChatIds.push(action.payload);
        },
        deselectChat: (state, action) => {
            state.selectedChatIds = state.selectedChatIds.filter(id => id !== action.payload);
        },
        clearSelectedChats: (state) => {
            state.selectedChatIds = [];
        }
    }
});

export const { selectChat, deselectChat, clearSelectedChats } = chatsSlice.actions;

export default chatsSlice.reducer;