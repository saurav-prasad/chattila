import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    convos: null
}

const convosSlice = createSlice({
    name: 'convos',
    initialState,
    reducers: {
        setConvos: (state, action) => {
            return { ...action.payload }
        },
        deleteConvos: (state, action) => {
            return null
        },
        addGroupUserInConvos: (state, action) => {
            return { ...state, groups: [...state?.groups, action.payload] }
        },
        addPeopleUserInConvos: (state, action) => {
            return { ...state, peoples: [...state?.peoples, action.payload] }
        },
        removeGroupUserFromConvos: (state, action) => {
            const newGroup = state?.groups.filter(item => item !== action.payload)
            return { ...state, groups: [...newGroup] }
        },
        removePeopleUserFromConvos: (state, action) => {
            const newPeoples = state?.peoples.filter(item => item !== action.payload)
            return { ...state, peoples: [...newPeoples] }
        },
    }
})

export const {
    setConvos,
    deleteConvos,
    addGroupUserInConvos,
    addPeopleUserInConvos,
    removeGroupUserFromConvos,
    removePeopleUserFromConvos
} = convosSlice.actions
export default convosSlice.reducer
