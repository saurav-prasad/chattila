import React, { useEffect, useRef, useState } from 'react'
import './messageBox.css'
import { useDispatch, useSelector } from 'react-redux'
import { personalMessageRoute } from '../../axios/backend'
import { addMessages, addNewMessage } from '../../redux/functions/messages'
import { useParams } from 'react-router-dom'
import sortArray from '../../functions/sortArray'
import timePassed from '../../functions/timePasses'
import { updateReadBy } from '../../redux/functions/lastMessage'


function MessageBox() {
  const { messages = {} } = useSelector(state => state.messagesSlice)
  const { user } = useSelector(state => state.authSlice)
  const [allMessages, setAllMessages] = useState([])
  const dispatch = useDispatch()
  const params = useParams()
  const messageBoxRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.userid) {
          if (messages[params.userid]) {
            // if (messages[params?.userid].length > 0) {
            dispatch(updateReadBy(params?.userid))
            setAllMessages(sortArray([...messages[params?.userid]]))
            // } else {
            //   setAllMessages([])
            // }
          }
          else if (!messages[params.userid]) {
            const messagesData = await personalMessageRoute.get(`/getmessages/${params.userid}`, {
              headers: {
                'auth-token': localStorage.getItem('token')
              }
            })
            // if (messagesData?.data?.data.length > 0) {
            setAllMessages(sortArray([...messagesData?.data?.data]))
            dispatch(addMessages({ data: messagesData?.data?.data, userId: params?.userid }))
            // } else {
            //   setAllMessages([])
            // }
          }
        }
      } catch (error) {
        // console.log(error);
        setAllMessages([])
      }
    }
    fetchData()

  }, [params.userid, messages])

  useEffect(() => {
    // Scroll to the bottom after each new message
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
    }
  }, [allMessages])
  // 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
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
          (user.id === item?.sender) ?
            <div className='w-full' key={i}>
              <p className='bg-[#005c4b] text-[#fff] text-lg max-w-[90%] w-fit float-right px-3 pt-1 pb-2 pr-[5.7rem] rounded-md relative'>
                {item?.content}
                <span className='select-none text-[10px] font-normal text-[#95c9bf] text-right absolute -bottom-1 right-2'>
                  {timePassed(item?.timestamp)}
                </span>
              </p>
            </div>
            :
            <div className='max-w-[90%]' key={i}>
              <p className='bg-[#363636] text-[#fff] text-lg w-fit float-left rounded-md px-3 pt-1 pb-2 pr-[5.7rem] relative'>
                {item?.content}
                <span className='select-none text-[10px] font-normal text-[#a0a0a0] text-right absolute -bottom-1 right-2'>
                  {timePassed(item?.timestamp)}
                </span>
              </p>
            </div>
        )
      }
    </div >
  )
}

export default MessageBox