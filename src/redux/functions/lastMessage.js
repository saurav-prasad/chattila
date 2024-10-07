import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const lastMessageSlice = createSlice({
    name: 'LastMessage',
    initialState,
    reducers: {
        addLastMessage: (state, action) => {
            const { sender, isRead, content, userId } = action.payload
            return {
                ...state,
                [userId]: {
                    sender, isRead, content, userId
                }
            }
        },
        updateReadBy: (state, action) => {
            const data = state[action.payload]
            return {
                ...state,
                [action.payload]: {
                    ...data,
                    isRead: true
                }
            }
        }
    }
})

export const { addLastMessage, updateReadBy } = lastMessageSlice.actions

export default lastMessageSlice.reducer