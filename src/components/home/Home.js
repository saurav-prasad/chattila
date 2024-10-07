import React, { useEffect, useState } from 'react'
import Chats from '../chats/Chats'
import Message from '../message/Message'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import socket from "../../socket/socket"
import { addOnlineUsers, removeOnlineUser } from '../../redux/functions/onlineUsers'
import { authRoute } from '../../axios/axios'
import { addUserDetail, removeUserDetail } from '../../redux/functions/userDetails'
import AllUsers from '../allUsers/AllUsers'
import { addMessages, addNewMessage } from '../../redux/functions/messages'
import { addLastMessage } from '../../redux/functions/lastMessage'
import sliceString from '../../functions/sliceString'

function Home() {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authSlice)
    const [showNoti, setShowNoti] = useState()
    const dispatch = useDispatch()
    const onlineUsers = useSelector(state => state.onlineUsers)
    const { messages } = useSelector(state => state.messagesSlice)
    const params = useParams()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        if (user) {
            socket.emit('online', user?.id)
        }
        // console.log(messages);
        socket.on('get-online-users', async (userIds) => {

            try {
                const filteredData = userIds?.filter(e => e !== user?.id)
                dispatch(addOnlineUsers(filteredData));  // Ensure this runs first
                // console.log(userIds);

                const uniqueUsers = userIds?.filter(item => !onlineUsers?.includes(item));
                const getUserDetailsPromises = await Promise.all(uniqueUsers.map(async item => {
                    const data = await authRoute.get(`/getuserdata/${item}`, {
                        headers: {
                            'auth-token': localStorage.getItem('token')
                        }
                    });
                    // console.log(data);
                    dispatch(addUserDetail([{ ...data.data.data }]))
                    return data.data.data;
                }));

                // console.log(getUserDetailsPromises);

            } catch (error) {
                console.log(error);
            }
        });

        socket.on("private-message", (data) => {
            if (data.sender !== user.id) {
                // console.log(messages);
                // console.log(data);
                if (messages[data.sender]) {
                    dispatch(addNewMessage({ userId: data.sender, data: { ...data } }))
                }
                dispatch(addLastMessage({ content: data.content, userId: data.sender, isRead: data.isRead, sender: data.sender }))
                setShowNoti({ username: data.username, profilePhoto: data.profilePhoto, content: data.content, userId: data.sender })
                setTimeout(() => {
                    setShowNoti()
                }, 1200);
            }
        })

        socket.on('disconnected-user', (userId) => {
            // console.log(userId);
            dispatch(removeOnlineUser(userId))
            dispatch(removeUserDetail(userId))
        })

        return () => {
            socket.off('get-online-users')
            socket.off('private-message')
            socket.off('disconnected-user')
        }
    }, [user, messages])


    return (
        <>
            <div className='md:flex h-full bg-[#2c2c2c] relative'>
                <Chats />
                <Message />

                {(showNoti && showNoti.userId !== params?.userid) &&

                    <div class={`flex justify-between py-1 px-2 bg-[#eaeaeaf5] rounded-lg absolute right-[18%] top-1 md:right-1 md:max-w-[40vw] lg:max-w-[30vw] w-[60%] z-[10] transition-all ease-in-out`}>
                        <div class="flex items-center space-x-4">
                            <img src={showNoti.profilePhoto} class="rounded-full h-10 w-10" alt="" />
                            <div class="flex flex-col space-y-1">
                                <span class="font-bold">{showNoti.username}</span>
                                <span class="text-sm"> {
                                    sliceString(showNoti.content, 80)
                                } </span>
                            </div>
                        </div>
                        <div class="flex-none px-2 py-2 text-stone-600 text-xs md:text-sm">
                            Just now
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Home
