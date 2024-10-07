import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const allUsersSlice = createSlice({
    name: 'alluserslice',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            return [...action.payload]
        },
        removeAllUsers: (state, action) => {
            return []
        }
    }
})
export const { setAllUsers, removeAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer