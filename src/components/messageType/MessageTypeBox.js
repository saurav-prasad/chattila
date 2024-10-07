import React, { useEffect, useState } from 'react'
import './messageTypeBox.css'
import createMessage from '../../functions/createMessage';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../../redux/functions/messages';
import socket from '../../socket/socket';
import { addLastMessage } from '../../redux/functions/lastMessage';
import throttle from '../../functions/throttling';
import { Send } from 'lucide-react';

function MessageType() {
    const [text, setText] = useState('')
    const textAreaHeightAdjust = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setText(e.target.value)
    }
    const params = useParams()
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsersSlice)

    const sendMessage = async () => {
        try {
            const textLength = text.length
            // console.log(textLength);
            if (params.userid && (textLength > 0)) {
                const message = await createMessage({ content: text, receiver: params.userid })
                dispatch(addNewMessage({ userId: params.userid, data: message.data }))
                dispatch(addLastMessage({ content: text, userId: params.userid }))
                const userData = allUsers?.filter((obj) => obj.id === params?.userid)
                const { profilePhoto, username } = userData[0]
                socket.emit('private-message', { ...message.data, username, profilePhoto })
                // console.log(message.data);
                setText('')
            }
        } catch (error) {
            console.log(error);
        }
    }
    function throttling(func, limit) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    const throttledSendMessage = throttling(sendMessage, 10);

    const onClick = () => {
        throttledSendMessage();
    }
    // useEffect(() => {
    //     window.addEventListener('keyup', async (key) => {
    //         //console.log(key);
    //         if (key.key === 'Enter') {
    //             await sendMessage()
    //         }
    //     })
    // }, [])
    useEffect(() => {
        setText('')
    }, [params.userid])

    return (
        <div className='flex items-center pb-1 pt-1 bg-[#2c2c2c] gap-1 w-full'>
            {/* textbox */}
            <textarea autoFocus value={text} onChange={textAreaHeightAdjust} placeholder='Type Something...' type="text" className='messageInputBox bg-[#2c2c2c] text-[#ffff] px-2 py-1 text-lg hover:bg-[#6b6a6ab0] transition-all w-full overflow-hidden outline-none' />
            {/* Send button */}
            <div onClick={onClick} className='w-16 h-full flex justify-center items-center hover:bg-[#6b6a6a6e] transition-all cursor-pointer rounded-sm active:bg-[#6b6a6ad2]'>
                <Send fontSize='large' className='text-[#ffff] ' />
            </div>
        </div>
    )
}

export default MessageType