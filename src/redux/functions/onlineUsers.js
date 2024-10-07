import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const onlineUsersSlice = createSlice({
    name: "onlineUsers",
    initialState,
    reducers: {
        addOnlineUsers: (state, action) => {
            // Assuming action.payload is an array of user objects
            const usersToAdd = action.payload.filter(newUser =>
                !state.some(existingUser => existingUser === newUser)
            );

            // Add unique users to the state
            return [...state, ...usersToAdd];
        },
        removeOnlineUser: (state, action) => {
            return state.filter(item => item !== action.payload)

        },
    }
})

export const { addOnlineUsers, removeOnlineUser } = onlineUsersSlice.actions

export default onlineUsersSlice.reducer