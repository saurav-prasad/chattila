import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Send } from 'lucide-react'
import timePassed from '../../functions/timePasses'
import { addAiMessage } from '../../redux/functions/aiChats'
import sortArray from '../../functions/sortArray'
import './aiChat.css'
import { aiRoute } from '../../axios/ai'

function AiChat({ aiToggle }) {
    const [users, setUsers] = useState([])
    const allUsers = useSelector(state => state.allUsersSlice)
    const { user } = useSelector(state => state.authSlice)
    const windowWidth = window.innerWidth
    const [loading, setLoading] = useState(false)

    const changeLoading = (e = !loading) => {
        setLoading(e)
    }
    useEffect(() => {
        // console.log(user);
        setUsers([...allUsers])
    }, [allUsers])

    const stopPropagation = (e) => {
        e.stopPropagation();
    };


    return (
        <div onClick={() => aiToggle(false)} className='absolute bg-[#000000c9] sm:bg-[#000000ad] z-[9] top-0 w-full h-full flex justify-center items-center'>
            <div onClick={stopPropagation} className='z-[10] md:w-auto sm:w-[65vw] w-[85vw] relative'>
                <div className='flex justify-center'>
                    <h1 className='text-white font-semibold text-center text-2xl select-none bg-[#180506] px-6 rounded-t-lg'>Ask Ai</h1>
                </div>
                <div className='aiBackgroundImage'></div>
                <div className='md:flex-[1] md:min-w-[50vw] max-w-[75vw] w-full chatbox space-y-2 border-r-2 border-[#352011] shadow-2xl shadow-[#222222] overflow-y-auto sm:h-[55vh] h-[65vh] rounded-md'>
                    {/* bg-[#bb6b35e0] */}
                    <div className={`md:flex-[5] message w-full h-full ${windowWidth <= 768 && 'hidden'} flex flex-col justify-between items-center z-[5]`}>

                        <AiMessageBox loading={loading} changeLoading={changeLoading} />
                        {/* text input */}
                        <AiMessageInput loading={loading} changeLoading={changeLoading} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiChat


function AiMessageInput({ loading, changeLoading }) {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const textAreaHeightAdjust = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setText(e.target.value)
    }

    const sendMessage = async () => {
        changeLoading(true)
        const date = Date.now()
        const textLength = text.length

        if (textLength > 0) {
            dispatch(addAiMessage({
                timestamp: date,
                isAi: false,
                message: text
            }))
            setText('')
            try {
                const fetchData = await aiRoute.post("", {
                    message: text
                })
                console.log(process.env.REACT_APP_AI_URL)
                console.log(fetchData.data)
                dispatch(addAiMessage({
                    timestamp: date,
                    isAi: true,
                    message: fetchData.data.result
                }))
                changeLoading(false)
            } catch (error) {
                console.log(error);
                changeLoading(false)
            }
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
        !loading && throttledSendMessage();
    }

    return (
        <div className='flex items-center pb-1 pt-1 bg-[#AE9BA1] gap-1 w-full'>
            {/* textbox */}
            <textarea disabled={loading} value={text} onChange={textAreaHeightAdjust} placeholder='Type Something...' type="text" className='messageInputBox bg-[#AE9BA1] text-black px-2 py-1 text-lg hover:bg-[#cab1b9] transition-all w-full overflow-hidden outline-none placeholder:text-black placeholder:font-medium font-medium focus:bg-[#cab1b9]' />
            {/* Send button */}
            <div onClick={onClick} className='w-16 h-full flex justify-center items-center hover:bg-[#cab1b9] transition-all cursor-pointer rounded-sm active:bg-[#6b6a6ad2]'>
                <Send fontSize='large' className='text-[#ffff] ' />
            </div>
        </div>
    )
}

function AiMessageBox({ loading, changeLoading }) {
    const messages = useSelector(state => state.aiChatsSlice)
    const { user } = useSelector(state => state.authSlice)
    const [allMessages, setAllMessages] = useState([])
    const messageBoxRef = useRef(null)

    useEffect(() => {
        async function fetchData() {
            try {
                setAllMessages(sortArray([...messages]))
            } catch (error) {
                // console.log(error);
                setAllMessages([])
            }
        }
        fetchData()

    }, [messages])

    useEffect(() => {
        // Scroll to the bottom after each new message
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
        }
    }, [allMessages])

    return (
        <div ref={messageBoxRef} className='messageBox h-full flex flex-col gap-3 px-3 overflow-auto pt-3 w-full lg:w-[68%] pb-1'>

            { //bg-[#f9fafba8] text-gray-900 
                allMessages?.length <= 0 &&
                <p className=' bg-[#f9fafba8] text-gray-900  font-semibold text-xl p-3 rounded-lg text-center'>
                    Send a message to start the chat...
                </p>
            }

            {
                (user && allMessages) &&
                allMessages?.map((item, i) =>
                    item?.isAi ?
                        <div className='max-w-[90%]' key={i}>
                            <p className='bg-[#363636fa] text-[#fff] text-lg w-fit float-left rounded-md px-3 pt-1 pb-2 pr-[5.7rem] relative '>
                                <img src="/images/robot2.png" className='h-6 w-6 object-contain rounded-full' alt="" />
                                {item?.message}
                                <span className='select-none text-[10px] font-normal text-[#a0a0a0] text-right absolute -bottom-1 right-2'>
                                    {timePassed(item?.timestamp)}
                                </span>
                            </p>
                        </div>

                        :
                        <div className='w-full' key={i}>
                            <p className='bg-[#005c4bfa] text-[#fff] text-lg max-w-[90%] w-fit float-right px-3 pt-1 pb-2 pr-[5.7rem] rounded-md relative'>
                                {item?.message}
                                <span className='select-none text-[10px] font-normal text-[#95c9bf] text-right absolute -bottom-1 right-2'>
                                    {timePassed(item?.timestamp)}
                                </span>
                            </p>
                        </div>
                )
            }
            {
                loading &&
                <div className='bg-[#363636] relative float-left rounded-md '>
                    <img src="/images/robot2.png" className='h-6 w-6 ml-3 mt-1  object-contain rounded-full' alt="" />
                    <div className="container px-3 pt-2 pb-2 mx-auto animate-pulse space-y-1">
                        <h1 className="w-full h-3 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <h1 className="w-full h-3 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <h1 className="w-full h-3 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    </div>
                </div>
            }
        </div >
    )
}