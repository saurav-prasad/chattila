import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const aiChatsSlice = createSlice({
    name: 'aiChats State',
    initialState,
    reducers: {
        addAiMessage: (state, action) => {
            return [...state, action.payload]
        }
    }
})

export const { addAiMessage } = aiChatsSlice.actions

export default aiChatsSlice.reducer

