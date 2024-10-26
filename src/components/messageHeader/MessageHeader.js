import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowBigLeftDash } from 'lucide-react';

function MessageHeader() {

    const params = useParams()
    const [name, setName] = useState()
    const allUsers = useSelector(state => state.allUsersSlice)
    const navigate = useNavigate()
    const onlineUsers = useSelector(state => state.onlineUsersSlice)
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        setIsOnline(onlineUsers.includes(params.userid))
    }, [onlineUsers, params.userid])

    useEffect(() => {
        setName(allUsers?.filter(e => e?.id === params?.userid)[0]?.username)
    }, [params])

    return (
        // bg-[#2c2c2c]
        <div className='bg-[#AE9BA1] flex items-center gap-3 py-3 px-2 border-b-2 border-[#222222] w-full'>
            <ArrowBigLeftDash fontSize='large' onClick={() => navigate("/")} className='text-white cursor-pointer  rounded-lg transition-all hover:bg-[#6b6a6a4d] active:bg-[#6b6a6a]' />
            <h1 className='text-[#000] text-2xl font-medium'>{name}</h1>
            <div className={`${isOnline ? 'bg-green-400' : 'bg-[#e21a15]'} rounded-full w-2 h-2`}></div>
        </div>
    )
}

export default MessageHeader