import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";
import convosSlice from "../functions/convos"
import messagesSlice from "../functions/messages"
import onlineUsersSlice from "../functions/onlineUsers"
import userDetailsSlice from "../functions/userDetails"
import allUsersSlice from "../functions/allUsers"
import lastMessageSlice from '../functions/lastMessage'
import aiChatsSlice from '../functions/aiChats'

const store = configureStore({
    reducer: {
        authSlice,
        convosSlice,
        messagesSlice,
        onlineUsersSlice,
        userDetailsSlice,
        allUsersSlice,
        lastMessageSlice,
        aiChatsSlice
    }
})

export default store