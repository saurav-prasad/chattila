import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {
        addUserDetail: (state, action) => {
            const userToAdd = action.payload.filter(newUser =>
                !state.some(existingUser => existingUser.id === newUser.id)
            );
            // console.log(...userToAdd);
            // let flag
            // Check if the user already exists
            // console.log(action.payload);
            // const userExists = state.find(item => item.id === action.payload.id)
            // console.log(!userExists);
            // if (!userExists) {
            // If not, push the new user data
            return [...state, ...userToAdd]
            // }
        },
        removeUserDetail: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const { addUserDetail, removeUserDetail } = userDetailSlice.actions

export default userDetailSlice.reducer