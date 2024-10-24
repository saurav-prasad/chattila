import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { convosRoute } from '../../axios/axios'
import addConvos from '../../functions/addConvos'
import removeConvos from '../../functions/removeConvos'
import { addPeopleUserInConvos, removePeopleUserFromConvos } from '../../redux/functions/convos'
import getLastMessage from '../../functions/getLastMessage'
import { addLastMessage, updateReadBy } from '../../redux/functions/lastMessage'
import readAllMessages from '../../functions/readAllMessages'
import sliceString from '../../functions/sliceString'
import { Slide } from 'react-awesome-reveal'

function User({ image, name, userId, isPopup = false }) {
    const [isOnline, setIsOnline] = useState(false)
    const [lastMessageState, setLastMessageState] = useState()
    const [isYou, setIsYou] = useState()
    const onlineUsers = useSelector(state => state.onlineUsersSlice)
    const messages = useSelector(state => state.messagesSlice)
    const { user } = useSelector(state => state.authSlice)
    const lastMessage = useSelector(state => state.lastMessageSlice)
    const convos = useSelector(state => state.convosSlice)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        setIsOnline(onlineUsers.includes(userId))
    }, [onlineUsers])

    const onClick = async () => {
        const a = await readAllMessages(userId)
        dispatch(updateReadBy(userId))
        navigate(`/${userId}`)
    }

    const onAddConvos = async (e) => {
        try {
            const convos = await addConvos(userId)
            // console.log(convos);
            dispatch(addPeopleUserInConvos(userId))
        } catch (error) {
            console.log(error);
        }
    }

    const onRemoveConvos = async (e) => {
        try {
            const convos = await removeConvos(userId)
            // console.log(convos);
            dispatch(removePeopleUserFromConvos(userId))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if (lastMessage[userId]) {
                    setLastMessageState({ ...lastMessage[userId] })
                    const a = (lastMessage[userId].sender === user.id) && (lastMessage[userId].content !== undefined)
                    setIsYou(a)
                }
                else {
                    const message = await getLastMessage(userId)
                    // console.log(message?.data);
                    const obj = {
                        userId,
                        content: message.data?.content,
                        isRead: message.data?.isRead,
                        sender: message.data?.sender
                    }

                    const a = (obj.sender === user.id) && (obj.content !== undefined)
                    setIsYou(a)

                    setLastMessageState({ ...obj })
                    dispatch(addLastMessage({ ...obj }))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [userId, lastMessage, messages])

    return (
        // <Slide damping={2} direction='up' duration={300} triggerOnce={true} cascade={true}>
        <div className='flex items-center space-x-2'>
            {isPopup &&
                (convos?.peoples?.includes(userId) ?
                    <Minus onClick={onRemoveConvos} className='text-white cursor-pointer hover:bg-[#6b6a6a] transition-all rounded-sm' />
                    :
                    <Plus onClick={onAddConvos} className='text-white cursor-pointer hover:bg-[#6b6a6a] transition-all rounded-sm' />)
            }
            <div onClick={onClick} className={`w-full relative flex items-center flex-row gap-2 px-2 pr-5 py-1 rounded-md hover:bg-[#d07839] hover:transition-all ${userId === params?.userid && 'bg-[#e89153]'}`}>
                <img
                    alt=""
                    src={image}
                    className="inline-block h-12 w-12 rounded-full ring-1 ring-white object-cover"
                />
                <div className='text-[#fff]'>
                    <p className='sm:text-lg text-base font-medium select-none text-ellipsis'>{sliceString(name, 17)}</p>
                    <p className='sm:text-sm text-xs font-normal select-none text-ellipse'>
                        {isYou && "You: "}{sliceString(lastMessageState?.content, 14)}
                    </p>
                </div>
                {
                    (!lastMessageState?.isRead && lastMessageState?.content && lastMessageState?.userId === lastMessageState?.sender)
                    && <img className='w-4 h-4 object-contain absolute bottom-6 right-5' src="/images/receive-mail.png" alt="" />
                }
                <div className={`${isOnline ? 'bg-green-400' : 'bg-[#e21a15]'} rounded-full w-2 h-2 absolute bottom-2 right-6`} />
            </div>
        </div>
        // </Slide>
    )
}

export default User