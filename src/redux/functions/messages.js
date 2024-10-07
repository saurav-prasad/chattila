import { createSlice } from "@reduxjs/toolkit"

const initialState = { messages: {} }

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessages: (state, action) => {
            // console.log(action.payload);
            return {
                messages: {
                    ...state.messages,
                    [action.payload.userId]: action.payload.data
                }
            }
        },
        addNewMessage: (state, action) => {
            // console.log("action", action.payload);
            let existingMessages = state.messages[action.payload.userId] || []

            return {
                messages: {
                    ...state.messages,
                    [action.payload.userId]: [...existingMessages, action.payload.data]
                }
            }
        }
    }
})

export const { addMessages, addNewMessage } = messagesSlice.actions
export default messagesSlice.reducer